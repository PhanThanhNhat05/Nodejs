

//button status
const btnStatus = document.querySelectorAll('[button-status]');
if(btnStatus.length > 0) {
    let url = new URL(window.location.href);
    btnStatus.forEach(btn => {
       btn.addEventListener('click', () => {
        const status = btn.getAttribute('button-status');
        // console.log('Button status clicked:', status);
        
        if(status) {
            url.searchParams.set('status', status); 
        }
        else {
            url.searchParams.delete('status');
        }
        // console.log(url.href)
        window.location.href = url.href;
        })
})
}
//end button


//form search
const formSearch = document.querySelector('#form-search');
if(formSearch) {
    let url = new URL(window.location.href);
    formSearch.addEventListener('submit', (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        // console.log(e.target.elements.keyword.value);
        if(keyword) {
            url.searchParams.set('keyword', keyword); 
        }
        else {
            url.searchParams.delete('keyword');
        }
        window.location.href = url.href;
    });
}
//end form search

//pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");

if(buttonPagination.length > 0) {
    let url = new URL(window.location.href);
    buttonPagination.forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.getAttribute('button-pagination');
            url.searchParams.set('page', page);
            window.location.href = url.href;
        });
    });
}
//end pagination


//Checkbox multi
const checkboxMulti = document.querySelector("[checkbox-multi]")
if(checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']")
    const inputId = checkboxMulti.querySelectorAll("input[name='id']")
    // console.log(inputCheckAll)
    // console.log(inputId)

    inputCheckAll.addEventListener("click", () => {
        //  console.log(inputCheckAll.checked)
         if(inputCheckAll.checked) {
            inputId.forEach(input => {
                input.checked = true;
            });            
         }
         else {
            inputId.forEach(input => {
                input.checked = false;
            });
         }
    });
    inputId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length
            // console.log(countChecked)
            // console.log(inputId.length)
            if(countChecked == inputId.length) {
                inputCheckAll.checked = true
            }
            else {
                inputCheckAll.checked = false;
            }
        })
    })
}
//End checkbox multi

//Form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti) {
    // console.log(formChangeMulti)
    formChangeMulti.addEventListener("submit", (e) =>  {
     e.preventDefault();
     
     const checkboxMulti = document.querySelector("[checkbox-multi]")

      const inputChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
      // phat trien phan xoa nhieu san pham
      const typeChange = e.target.elements.type.value
      if(typeChange == "delete-all") {
        const isConfirm = confirm("Ban co chac chan muon xoa tat ca san pham nay");
        if(!isConfirm) {
            return;
        }
        else {

        }
      }
      
    //   console.log(inputChecked)
      if(inputChecked.length > 0) {
         let ids = [];
         const inputIds = formChangeMulti.querySelector("input[name='ids']")
         inputChecked.forEach(input => {
            const id = input.value;
            if(typeChange == "change-position") {
                const position = input.closest("tr").querySelector("input[name='position']").value;
                console.log(`${id}-${position}`)
                ids.push(`${id}-${position}`)
            }else {
            ids.push(id)
            }
         })
         inputIds.value = ids.join(", ")
         formChangeMulti.submit();
      }
      else {
        alert("Vui long chon it nhat 1 san pham")
      }
    })
}
//End form change multi