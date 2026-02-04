# Task Manager CLI - Complete Installation & Usage

# 1. Make script executable
chmod +x app.js

# 2. Install as global command (choose ONE):
# For current user only:
ln -s "$(pwd)/app.js" ~/.local/bin/task-cli

# OR for all users (requires sudo):
sudo ln -s "$(pwd)/app.js" /usr/local/bin/task-cli

# 3. Initialize task file
touch task.json
echo "[]" > task.json

# 4. USAGE EXAMPLES:
# Add task
task-cli add "Buy groceries"

# List all tasks
task-cli list

# Filter by status
task-cli list todo
task-cli list in-progress
task-cli list done

# Update status (use actual ID from list)
task-cli mark-in-progress <task-id>
task-cli mark-done <task-id>

# Update description
task-cli update <task-id> "New description"

# Delete task
task-cli delete <task-id>

# Example workflow:
task-cli add "Study for exam"
task-cli list  # Get the ID
task-cli mark-in-progress <id-from-list>
task-cli update <id-from-list> "Study JavaScript for exam"
task-cli mark-done <id-from-list>
task-cli delete <id-from-list>