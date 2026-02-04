#! /usr/bin/env node
import { randomUUID } from 'node:crypto'
import { writeFile, readFile } from 'node:fs/promises'

const args = process.argv.slice(2)

const addTask = async (task) => {
    const currentData = await readFile('task.json', 'utf8')
    const jsonData = JSON.parse(currentData)

    const id = randomUUID()
    const newTodo = {
        id,
        description: task,
        status: 'todo',
        createdAt: new Date().toISOString(),
        updatedAt: null
    }

    jsonData.push(newTodo)

    try {
        await writeFile('task.json', JSON.stringify(jsonData, null, 4))
        console.log(`Task added successfully (ID: 1 ${id})`)
    } catch (error) {
        console.error('Error writing file:', err);
    }
}

const updateStatus = async (status, id) => {
    const currentData = await readFile('task.json', 'utf8')
    const jsonData = JSON.parse(currentData)
    const taskToEditIndex = jsonData.findIndex(task => task.id === id)

    jsonData[taskToEditIndex].status = status === 'mark-in-progress'
        ? 'in-progress'
        : 'done'

    try {
        await writeFile('task.json', JSON.stringify(jsonData, null, 4))
        console.log(`Task with ID ${jsonData[taskToEditIndex].id} marked as ${jsonData[taskToEditIndex].status}`)
    } catch (error) {
        console.error('Error writing file:', err);
    }
}

const updateDescription = async (id, description) => {
    const currentData = await readFile('task.json', 'utf8')
    const jsonData = JSON.parse(currentData)
    const taskToEditIndex = jsonData.findIndex(task => task.id === id)

    jsonData[taskToEditIndex].description = description

    try {
        await writeFile('task.json', JSON.stringify(jsonData, null, 4))
        console.log(`Task with ID ${jsonData[taskToEditIndex].id} description updated to ${jsonData[taskToEditIndex].description}`)
    } catch (error) {
        console.error('Error writing file:', err);
    }
}

const deleteTask = async (id) => {
    const currentData = await readFile('task.json', 'utf8')
    const jsonData = JSON.parse(currentData)
    const taskToDeleteIndex = jsonData.findIndex(task => task.id === id)

    jsonData.splice(taskToDeleteIndex, 1)

    try {
        await writeFile('task.json', JSON.stringify(jsonData, null, 4))
        console.log(`Task with ID ${id} was deleted`)
    } catch (error) {
        console.error('Error writing file:', err);
    }
}

const listTasks = async (filter) => {
    const tasksJSON = await readFile('task.json', 'utf8')
    const parsedData = JSON.parse(tasksJSON)

    if (filter) {
        console.log(parsedData.filter(task => task.status === filter))
        return
    }

    console.log(parsedData)
}

switch (args[0]) {
    case 'list':
        listTasks(args[1])
        break
    case 'add':
        addTask(args[1])
        break
    case 'mark-in-progress':
    case 'mark-done':
        updateStatus(args[0], args[1])
        break
    case 'update':
        updateDescription(args[1], args[2])
        break
    case 'delete':
        deleteTask(args[1])
        break
}