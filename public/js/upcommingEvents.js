const blogSection = document.querySelector('.blogs-section');

db.collection("blogs").get().then((blogs) => {
    blogs.forEach(blog => {

        let theData = blog.data();
        
        let newDate = theData.theDate;
        let newMonth = theData.theMonth;
        let newYear = theData.theYear;
        // console.log(newDate);

        let numDate = parseInt(newDate);
        let numMonth = parseInt(newMonth)*100;
        let numYear = parseInt(newYear)*10000;

        let usedDate = numDate + numMonth + numYear;

        let date = new Date();

        let currentDate = date.getDate();
        let currentMonth = date.getMonth()*100;
        let currentYear = date.getFullYear()*10000;

        let cur = currentDate + currentMonth + currentYear;

        console.log(usedDate + " " +cur + "\n");



        if(usedDate > cur)
            {
                if(blog.id != decodeURI(location.pathname.split("/").pop())){
                    createBlog(blog);
                }
            }
    
    })
})

const createBlog = (blog) => {
    let data = blog.data();
    blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
        <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
        <a href="/${blog.id}" class="btn dark">read</a>
    </div>
    `;
}