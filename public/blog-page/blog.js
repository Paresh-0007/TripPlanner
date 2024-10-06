    const fillBlogData = function (blogData) {
    console.log(blogData)
    let title = document.getElementById('title');
    let image = document.getElementById('image');
    let introduction = document.getElementById('introduction');
    let list = document.getElementById('list');
    let conclusion = document.getElementById('conclusion');
    const blog = blogData.data
    //console.log(blog);

    title.innerText = blog.title
    image.src=blog.image
    introduction.innerText = blog.introduction
    conclusion.innerText = blog.conclusion
    const innerplace = blog.place
    for(let i of innerplace){
        list.innerHTML+=`
        <li>
        <h2>${i.name}</h2>
        <p>${i.description}</p>
        </li>
        `
    }
    }

    async function fetchBlog(blogId) {
      try {
        const response = await fetch(`/api/blogs/blog/${blogId}`, {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error(`Error fetching place: ${response.status}`);
        }

        const blogData = await response.json();
        fillBlogData(blogData);
      } catch (error) {
        console.error('Failed to fetch place data:', error);
      }
    }

    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');

    if (blogId) {
      fetchBlog(blogId);
    }