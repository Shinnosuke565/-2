const tasks = [];

document.getElementById('addButton').addEventListener('click', () => {
  const taskName = document.getElementById('addTask').value;
  tasks.push({
    id: tasks.length,
    name: taskName,
    state: '作業中',
  });

  document.getElementById('addTask').value = '';

  displayTasks();
});

const showWorkingRadio = document.getElementById('doing');
const showCompletedRadio = document.getElementById('done');

const getSelectedState = () => {
  if (showWorkingRadio.checked) {
    return '作業中';
  } else if (showCompletedRadio.checked) {
    return '完了';
  } else {
    return 'all';
  }
};

const displayTasks = () => {
  const selectedState = getSelectedState();
  console.log(selectedState); 
  const tbody = document.querySelector('#todoTable tbody');
  tbody.innerHTML = '';

  tasks.forEach((task, index) => {
    if (selectedState === 'all' || task.state === selectedState) {
      const row = tbody.insertRow(-1);
      row.insertCell(-1).innerText = index;
      row.insertCell(-1).innerText = task.name;
      const stateCell = row.insertCell(-1);

      const stateButton = document.createElement('button');
      stateButton.innerText = task.state;
      stateCell.appendChild(stateButton);

      stateButton.addEventListener('click', () => {
        if (task.state === '作業中') {
          task.state = '完了';
        } else if (task.state === '完了') {
          task.state = '作業中';
        }
        // タスクの状態が変更されたら再度表示
        displayTasks();
      });

      const deleteCell = row.insertCell(-1);
      const deleteButton = document.createElement('button');
      deleteButton.innerText = '削除';
      deleteCell.appendChild(deleteButton);

      deleteButton.addEventListener('click', () => {
        tasks.splice(index, 1);
        updateTaskIds(); // タスクを削除した後、IDを更新
        // タスクが削除されたら再度表示
        displayTasks();
      });
    }
  });
};

const updateTaskIds = () => {
  // タスクのIDを再計算
  tasks.forEach((task, index) => {
    task.id = index;
  });
};

// ラジオボタンのイベントリスナーを設定
showWorkingRadio.addEventListener('change', displayTasks);
showCompletedRadio.addEventListener('change', displayTasks);

// 最初に表示を行う
displayTasks();

const showAllRadio = document.getElementById('all'); // 全てのラジオボタンを取得
showAllRadio.addEventListener('change', displayTasks); // 全てのラジオボタンにイベントリスナーを追加
