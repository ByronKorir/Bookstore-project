
//display all available books
function displayAllbooks(){
   fetch(`https://bookstore-h6nu.onrender.com/books`)
   .then(res => res.json())
   .then((books) => {
      books.forEach(book => {
         
         let card = document.querySelector('#card')
         card.innerHTML+=`
         <div  id="cardDis" class="col-md-4 text-center px-2 my-3">
               <div id="cardBox" class="bg-info p-2 text-dark bg-opacity-50 border">
                  <div>
                    <img class="img-fluid" src="${book.cover}" alt="loading...">
                  </div>
                  <div id="dets">                     
                     <p id="ds" ><strong>By:</strong> ${book.author}<br><strong>Year:</strong><em pe-4>${book.published_year}</em><strong>Genre:</strong> <em>${book.genre}</em></p>
                     <p id="description"></p>
                     <h6><strong>price :</strong>kes<em>${book.price}</em><br><strong>stock:</strong><em id="st">${book.stock}</em></h6>
                     
                  </div>
                  <div id="buttons">
                     <button onclick="viewDescription(${book.id})" type="button" class="btn btn-success">view</button>
                     <button onclick="editForm(${book.id})" type="button" class="btn btn-warning">edit book</button>
                     <button onclick="deleteBook(${book.id})" type="button" class="btn btn-danger">delete</button>
                  </div>
               </div>  
                  
         </div>
             
       `
     
      });
   })
}
displayAllbooks();

//editing a book
function editForm(id){
   fetch(`https://bookstore-h6nu.onrender.com/books/${id}`)
   .then(res => res.json())
   .then((book) => {
      const editForm = document.querySelector('#book-cards')
      editForm.innerHTML='';
      editForm.innerHTML=`
      <div class="mx-auto" style="width: 600px; ">
         <div class="mb-3 p-3 mb-2 bg-success text-white ">
            <hr>
            <h4 id="add_book" class="text-center text-warning ">EDIT BOOK</h4>
            <label for="title" class="form-label">title</label>
            <input required type="text" class="form-control" id="title" value="${book.title}">
      
            <label for="author" class="form-label">author</label>
            <input required type="text" class="form-control" id="author" value="${book.author}">
      
            <label for="genre" class="form-label">genre</label>
            <input required type="text" class="form-control" id="genre" value="${book.genre}">
      
            <label for="published_year" class="form-label">published_year</label>
            <input required type="number" class="form-control" id="published_year" value="${book.published_year}">
            
            <label for="cover" class="form-label">coverURL</label>
            <input required type="url" class="form-control" id="coverURL" value="${book.cover}">
      
            <label for="price" class="form-label">price</label>
            <input required type="number" class="form-control" id="price" value="${book.price}">
      
            <label for="stock" class="form-label">stock</label>
            <input required type="number" class="form-control" id="stock" value="${book.stock}">
            <div class="text-center">
               <button type="submit" onclick="editBook(${book.id})" id="updateBtn" class="buttons btn btn-warning my-2 text-center px-4">update</button>
            </div>
           
          </div>
      </div>
      `
   })
}

// sending edited details using id
function editBook(id){
   let title = document.querySelector('#title').value;
   let author = document.querySelector('#author').value
   let coverURL = document.querySelector('#coverURL').value
   let published_year = document.querySelector('#published_year').value
   
   let genre = document.querySelector('#genre').value
   let price = document.querySelector('#price').value
   let stock = document.querySelector('#stock').value
   fetch(`https://bookstore-h6nu.onrender.com/books/${id}`,{
      method:'PATCH',
      headers:{
         'Accept':"application/json",
         'content-Type':"application/json"
      },
      body:JSON.stringify({
         title:title,
         author:author,
         cover:coverURL,
         published_year:published_year,
         // description:description,
         genre:genre,
         price:price,
         stock:stock
      })
   })
   .then(res => res.json())
   .then(data => {
      alert('✅ book updated')
   })

}

// deleting a book by id
function deleteBook(id){
   fetch(`https://bookstore-h6nu.onrender.com/books/${id}`,{
      method:'DELETE'
   })
   .then(res => res.json())
   .then((data) => {
      alert('Book deleted')
   })
}

//add books
function addBooks(){
   const addForm = document.querySelector('#book-cards')
   addForm.innerHTML=""
   addForm.innerHTML=`
   <div class="mx-auto" style="width: 600px; ">
      <div class="mb-3 p-3 mb-2 bg-success text-white ">
         <hr>
         <h4 id="add_book" class="text-center text-warning ">ADD BOOK</h4>
         <label for="title" class="form-label">title</label>
         <input required type="text" class="form-control" id="title" placeholder="title">
   
         <label for="author" class="form-label">author</label>
         <input required type="text" class="form-control" id="author" placeholder="author">
   
         <label for="author" class="form-label">genre</label>
         <div class="form-floating">
            <select required class="form-select" id="genre" aria-label="Floating label select example">
              <option selected></option>
              <option value="action">action</option>
              <option value="adventure">adventure</option>
              <option value="anime">anime</option>
              <option value="comedy">comedy</option>
              <option value="document">documentary</option>
              <option value="drama">drama</option>
              <option value="education">education</option>
              <option value="fantasy">fantasy</option>
              <option value="health">health</option>
              <option value="historical">historical</option>
              <option value="horror">horror</option>
              <option value="kids">kids</option>
              <option value="mystery">mystery</option>
              <option value="thriller">thriller</option>
              <option value="romance">romance</option>
            </select>
            <label for="floatingSelect">Works with selects</label>
          </div>
   
         <label for="published_year" class="form-label">published_year</label>
         <input required type="number" class="form-control" id="published_year" placeholder="published_year">
         
   
         <label for="description" class="form-label">description</label>
         <textarea required class="form-control" id="description" rows="5" placeholder="description"></textarea>
   
         <label for="cover" class="form-label">coverURL</label>
         <input required type="url" class="form-control" id="coverURL" placeholder="coverURL">
   
         <label for="price" class="form-label">price</label>
         <input required type="number" class="form-control" id="price" placeholder="price">
   
         <label for="stock" class="form-label">stock</label>
         <input required type="number" class="form-control" id="stock" placeholder="stock">
         <div class="text-center">
             <button type="submit" onclick="postBook()" id="updateBtn" class="buttons btn btn-warning my-2 ">post</button>
         </div>
         
       </div>
   </div>
   `
}
// posting added book
function postBook(){
   let title = document.querySelector('#title').value;
   let author = document.querySelector('#author').value
   let coverURL = document.querySelector('#coverURL').value
   let published_year = document.querySelector('#published_year').value
   let description = document.querySelector('#description').value
   let genre = document.querySelector('#genre').value
   let price = document.querySelector('#price').value
   let stock = document.querySelector('#stock').value
   fetch(`https://bookstore-h6nu.onrender.com/books`,{
      method:'POST',
      headers:{
         'Accept':"application/json",
         'content-Type':"application/json"
      },
      body:JSON.stringify({
         title:title,
         author:author,
         cover:coverURL,
         published_year:published_year,
         description:description,
         genre:genre,
         price:price,
         stock:stock
      })
   })
   .then(res => res.json())
   .then(data => {
      alert('✅ book added')
   })
}

// function to view single book description 
function viewDescription(id){
   fetch(`https://bookstore-h6nu.onrender.com/books/${id}`)
   .then(res => res.json())
   .then(book => {
      let card = document.querySelector('#book-cards')
      card.innerHTML= ""
      card.innerHTML=`
      <<div id="description-view" class="container-fluid text-center">
      <div id="containerI" class="bg-success p-2 text-dark bg-opacity-75 border  text-center mx-6">
         <div >
            <img id="singleimg" class="img-fluid " src="${book.cover}" alt="loading...">
   
         </div>
         <div >
            <p > <strong>by:</strong> <em>${book.author}</em></p><br>
            <p >${book.description}</p>  <br>
            <p><strong>Genre</strong><em>${book.genre}</em> <br><strong>year published:</strong><em>${book.published_year}</em><br><strong>price</strong><em>kes ${book.price}</em><br><strong>stock</strong><em>${book.stock}</em></p>                
    
            <label for="quantity" class="form-label">quantity</label>
            <input  required type="number" class="form-control text-center" id="quantity" value="1">
           
      
         </div>
         <div id="buttons">
            <button onclick="addCart(${book.id})" type="button" class="btn btn-info">add to cart</button>
            <form class="d-flex" role="search">
               <button class="btn btn-danger mb-2"  id="refreshBtn" type="submit" class="btn btn-outline-success" >X</button>
            </form>
         
         </div>
      </div>
      
   </div> 
      `
     
      
   })
}

//add cart
function addCart(id){
   fetch(`https://bookstore-h6nu.onrender.com/books/${id}`)
   .then(res => res.json())
   .then(book => {
      
      let quantity = document.querySelector('#quantity').value
      if(quantity<=book.stock && quantity>=0){
         const total = quantity*book.price
      // console.log(total)
      let card = document.querySelector('#landing-page')
      
      card.innerHTML= ""
      card.innerHTML=`
      <div class="container-fluid text-center">
            <div id="containerI" class="bg-success p-2 text-dark bg-opacity-75 border  text-center mx-6">
               <div>
                  <h4 id="add_book" class="text-center text-warning ">CART</h4>
                  <label for="title" class="form-label">book</label>
                  <input required type="text" class="form-control" id="title" value="${book.title}">
            
                  <label for="Total" class="form-label">Total(Ksh.)</label>
                  <input  required type="number" class="form-control text-center" id="Total" value="${total}">
                  
                  <label for="customer" class="form-label">customer(optional)</label>
                  <input required type="text" class="form-control" id="customer" placeholder="enter customer name">
                  
                  <div id="buttons" class="mt-2">
                     <button onclick=" updatingStock(${book.id},${book.stock},${quantity})" type="button" class="btn btn-info">paid</button>
                     <form class="d-flex" role="search">
                        <button class="btn btn-danger mb-2"  id="refreshBtn" type="submit" class="btn btn-outline-success" >X</button>
                     </form>
                  </div>
               </div>
               
            </div>
      
      </div> 
      `
      }else{
         alert('❌ not available currently')
      }
      
     
     
   })
   
}
// function to update database

function updatingStock(id,stock,quantity){
   const customer = document.querySelector('#customer').value
      const newStock = stock-quantity
     
         fetch(`https://bookstore-h6nu.onrender.com/books/${id}`,{
         method:'PATCH',
         headers:{
            'Accept':'application/json',
            'content-type':"application/json"
         },
         body:JSON.stringify({
            stock:newStock
         })
         })
        
         
         
         alert('👍 transaction successfull ')       
            
      }
       
        





//searching books by either titles or genres
function searchBooks(){
   fetch(`https://bookstore-h6nu.onrender.com/books`)
   .then(res => res.json())
   .then((books) => {
      const searchedGenre = document.querySelector('#search').value;
      books.forEach(book=> {
         if(searchedGenre === book.title || searchedGenre == book.genre){
            let card = document.querySelector('#card')
            card.innerHTML=''
            card.innerHTML+=`
            <div  id="cardDis" class="col-md-4 text-center px-2 my-3">
                  <div id="cardBox" class="bg-info p-2 text-dark bg-opacity-50 border">
                     <div>
                       <img class="img-fluid" src="${book.cover}" alt="loading...">
                     </div>
                     <div id="dets">                     
                        <p id="ds" ><strong>By:</strong> ${book.author}<br><strong>Year:</strong><em>${book.published_year}</em>|  |<strong>Genre:</strong> <em>${book.genre}</em></p>
                        <p id="description"></p>
                        <h6><strong>price :</strong>kes<em>${book.price}</em><br><strong>stock:</strong><em id="st">${book.stock}</em></h6>
                        
                     </div>
                     <div id="buttons">
                        <button type="button" class="btn btn-success">add to cart</button>
                        <button onclick="editForm(${book.id})" type="button" class="btn btn-warning">edit book</button>
                        <button onclick="deleteBook(${book.id})" type="button" class="btn btn-danger">delete</button>
                     </div>
                  </div>  
                     
            </div>
                
          `
         }
         
      });
      
      
   })
}

//    const customer = document.querySelector('#customer').value
         // // console.log(customer)
         // const total = document.querySelector('#Total').value
         // // console.log(total)
         // fetch(`http://localhost:3000/purchase`,{

         //       method:'POST',
         //       headers:{
         //          'Accept':'application/json',
         //          'content-type':"application/json"
         //       },
         //       body:JSON.stringify({
         //          customer:customer,
         //          book:Title,
         //          quantity:quantity,
         //          total:total
         //       })
         //    })
         //       .then((res) => res.json())
         //       .then(data => {
         //          alert('not')
         //       })