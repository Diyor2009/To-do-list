var wrapper = document.getElementById("list_wrapper");
var add_wrapper = document.getElementById("add_wrapper");
var options_wrapper = document.getElementsByClassName("list_options_wrapper")[0];
var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

function showTime(time) {
    var res = "";
    if (time[1] != ":") {
        res = time.slice(0, 2);
    } else {
        res = `0${time[0]}`;
    };
    res += ":"
    if (time[3] != ":") {
        res += time.slice(3, 5);
    } else {
        res += `0${time[3]}`
    };
    res += ":";
    if (time[7]) {
        res += time.slice(6, 8);
    } else {
        res += `0${time[6]}`
    };
    return res;
};

if (!localStorage.getItem("to_do_list")) {
    localStorage.setItem("to_do_list", JSON.stringify([]));
};

function showInput(id, boolean) {
    if (boolean == "true") {
        return `<input id="${id}" type="checkbox" checked onclick="checkInput(\`${id}\`)" class="item_checkbox">`;
    } else {
        return `<input id="${id}" type="checkbox" onclick="checkInput(\`${id}\`)" class="item_checkbox">`;
    };
};

function show() {
    wrapper.innerHTML = "";
    var arr = JSON.parse(localStorage.getItem("to_do_list"));
    if (arr[0]) {
        arr.forEach(item => {
            wrapper.innerHTML += `
            <label for="${item.id}" class="list_item">
                ${showInput(item.id, item.checked.toString())}
                <div class="item_content_text_wrapper">
                    <div class="text">${item.content}</div>
                    <div class="tooltip_text_wrapper">${item.content}</div>
                </div>
                <div class="item_created_date">
                    <span class="date">${item.created_time}</span>
                </div>
                <img onclick="deleteItem(\`${item.id}\`)" class="delete_icon" src="./Images/delete.jpg">
            </label>
            `;
        });
    } else {
        wrapper.innerHTML = "No added tasks";
    };
};

function checkInput(input_id) {
    var list = JSON.parse(localStorage.getItem("to_do_list"));
    list.forEach(item => {
        if (item.id == input_id) {
            if (document.getElementById(input_id).checked) {
                item.checked = true;
            } else {
                item.checked = false;
            };
        };
    });
    localStorage.setItem("to_do_list", JSON.stringify(list))
};

function deleteItem(item_id) {
    var list = JSON.parse(localStorage.getItem("to_do_list"));
    list = list.filter(item => item.id != item_id);
    localStorage.setItem("to_do_list", JSON.stringify(list));
    show();
};

function showOptions() {
    if (options_wrapper.className.includes("showed")) {
        options_wrapper.classList.remove("showed");
    } else {
        options_wrapper.classList.add("showed");
    };
};

function addItem(type) {
    var add_input = document.getElementById("add_input");
    var add_icon = document.getElementsByClassName("add_icon")[0];
    if (type == "show") {
        add_input.classList.remove("closed");
        add_icon.setAttribute("onclick", "addItem(`add`)");
        add_input.target = true;
    };
    if (type == "add") {
        var list = JSON.parse(localStorage.getItem("to_do_list"));
        if (add_input.value) {
            list.push(
                {
                    checked: false,
                    id: new Date().getTime(),
                    created_time: `${new Date().getDate()} ${months[new Date().getMonth()]} ${(showTime((new Date().getHours().toString() + ":" + new Date().getMinutes().toString() + ":" +  new Date().getSeconds().toString())))}`,
                    content: add_input.value
                }
            );
            localStorage.setItem("to_do_list", JSON.stringify(list));
        };
        add_input.value = "";
        add_input.classList.add("closed");
        add_icon.setAttribute("onclick", "addItem(`show`)");
        show();
    };
};

function filterList() {
    var list = JSON.parse(localStorage.getItem("to_do_list"));
    list = list.filter(item => item.checked != true);
    localStorage.setItem("to_do_list", JSON.stringify(list))
    show()
};

show();