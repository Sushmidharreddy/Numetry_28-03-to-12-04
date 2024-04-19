import axios from 'axios';
const url="http://localhost:9292/api/v1/get";
const url1="http://localhost:9292/api/v1/post";
const url2="http://localhost:9292/api/v1/login";
const url3="http://localhost:9292/api/v1/logout";
const url4="http://localhost:9292/api/v1/role";
const url5="http://localhost:9292/api/v1/postBook";
const url6="http://localhost:9292/api/v1/getBook";
const url7="http://localhost:9292/api/v1/book/delete";
const url8="http://localhost:9292/api/v1/book/update";
const url9="http://localhost:9292/api/v1/getbook";
const url10="http://localhost:9292/api/v1/issuedDetails"
const url11="http://localhost:9292/api/v1/get/IssuedDetails";



class RegistrationService
{
    getDetails()
    {
        return axios.get(url);
    }

    postDetails(values)
    {
        return axios.post(url1,values);
    }

    postDetailsLogin(credentials)
    {
        return axios.post(url2,credentials)
    }

    postDetailslogout(a)
    {
        return axios.post(url3+"/"+a,a);
    }

    getRole(userName) {
        return axios.post(url4 + "/" +userName, userName);
    }

    postBookDetails(formData)
    {
        return axios.post(url5,formData)
    }

    getBookDetails()
    {
        return axios.get(url6)
    }

    updateBookDetails(a,formData)
    {
        return axios.put(url8+"/"+a, formData)
    }

    deleteBookDetails(b)
    {
        return axios.delete(url7+'/'+b)
    }

    getDetailsById(a)
    {
        return axios.get(url9+"/"+a)
    }

    postIssued(bookAuthor,bookName,price,email,userName)
    {
        return axios.post(url10,  {bookAuthor,bookName,price,email,userName} , {
            headers: {
              'Content-Type': 'application/json'
            }
          });
    }

    findIssued()
    {
        return axios.get(url11)
    }
  

   
}
export default new RegistrationService();