const baseUrl = 'https://maciag.ursse.org/api'

$(document).ready(function() {
    token = window.localStorage.getItem('oba-token')
    if (!token) {
        setTimeout(() => {
            window.location.href = 'https://maciag.ursse.org/oba/login.html'
        }, 500);
        return
    }
    const table = $('#my-classes-tbody')
    $.ajax({
        type: 'GET',
        url: baseUrl + '/courses/all',
        headers: { 'Authorization': 'Bearer ' + token },
        success: ({ result }) => {
            result.success.forEach(element => {
                table.append($(`
<tr>
    <>FACULTY NAME</>
    <>${element.faculty_name} ${element.course_number}</>
    <>TERM</>
    <>YEAR</>
    <>${element.status}</>
</tr>                
                `).on('click', () => {
                    alert('navigating to: ' + element)
                }))
            })
        },
        error: (e) => {
            window.localStorage.removeItem('oba-token')
            alert(`error loading page: ${e}`)
            window.location.href = 'https://maciag.ursse.org/oba/login.html'
        }
    })
})
