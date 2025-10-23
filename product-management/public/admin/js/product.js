//change status 
const btnChangeStatus = document.querySelectorAll("[button-change-status]");
if(btnChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status")
    let path = formChangeStatus.getAttribute("data-path") || ''
    // make path absolute (ensure it starts with '/') so the browser doesn't treat it as a hostname
    if (path && !path.startsWith('/')) path = '/' + path;
    
    
    btnChangeStatus.forEach(btn => {
        btn.addEventListener("click", () => {
            const statusCurrent = btn.getAttribute("data-status");
            const id = btn.getAttribute("data-id")
            let statusChange = statusCurrent == "active" ? "inactive" : "active"


            // console.log(statusCurrent)
            // console.log(id)
            // console.log(statusChange)

            const action = path + `/${statusChange}/${id}?_method=PATCH`

            formChangeStatus.action = action
            formChangeStatus.submit();
        });
    });
}
//end change status

//delete item
const btnsDelete = document.querySelectorAll("[button-delete]") 
if(btnsDelete.length > 0) {
    const formDeleteItem = document.querySelector("#form-delete-item")
    const path = formDeleteItem.getAttribute("data-path")
    btnsDelete.forEach(btn => {
        btn.addEventListener("click", () =>  {

            const isConfirm = confirm("ban co muon xoa san pham nay?");
            if(isConfirm) {
                const id = btn.getAttribute("data-id")
                const action = `${path}/${id}?_method=DELETE`
                console.log(action)
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
        });
    });
}
//end delete item