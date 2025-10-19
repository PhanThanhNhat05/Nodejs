console.log("OK")

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