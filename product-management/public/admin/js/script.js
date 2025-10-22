

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
