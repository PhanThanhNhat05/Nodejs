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