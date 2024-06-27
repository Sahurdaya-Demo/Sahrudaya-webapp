import '../../login/logincss/main.css'
import '../../login/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../login/logincss/util.css'
import portr from '../../login/images/potr.png'
import { useState,useEffect } from 'react';
import LoadExternalScript from '../../../LoadExternalScript';
import axios from 'axios';
import { LinkApi } from '../Resource';


function Register({secure})
{
	const[alerted,setalerted]=useState(false)
    const[email,setemail]=useState('')
    const[name,setname]=useState('')
    const[password,setpassword]=useState('')
	const[crpassword,setcrpassword]=useState('')
    const[age,setage]=useState('')
    const[phone,setphone]=useState('')
    const[image,setimage]=useState('')
    const[qualification,setqualification]=useState('')
    const handleSubmit=(e)=>{
        e.preventDefault();
        
      }
	const check=()=>{
		const fileInput = document.getElementById('check');
		if (fileInput.files.length > 0) {
			const img = document.createElement('img');

				const selectedImage = fileInput.files[0];

				const objectURL = URL.createObjectURL(selectedImage);
				console.log(selectedImage.size*0.001)
				img.onload = function handleLoad() {
				console.log(`Width: ${img.width}, Height: ${img.height}`,);

				if ((img.width == 378 && img.height == 508) && (selectedImage.size*0.001)<100) {
					setalerted(true)
					console.log(
					"The image's width or height is less than 100px",
					);
				}

				URL.revokeObjectURL(objectURL);
				};
				img.src = objectURL;
		}
	}
	const Registration=async()=>{
		let type='counsellor'
		 if(alerted){
		  if(email!==''&&email.includes('@')){
			if(password!==''&&password===crpassword){
				
			let formField = new FormData()
			formField.append('image',image)
			formField.append('name',name)
			formField.append('email',email)
			formField.append('type',type)
			formField.append('age',age)
			formField.append('qualification',qualification)
			formField.append('phone',phone)
			formField.append('password',password)
			formField.append('password2',crpassword)
			formField.append('is_active',1)
			await axios({
				method:'post',
				// url: `http://127.0.0.1:8000/validpost`,
				url: `${LinkApi}validpost`,
				data:{'secure_str':secure},
				headers: {
				  'Content-type': 'application/json',
				}
			  })
			try{
			  await axios({
				method: 'post',
				// url:'http://127.0.0.1:8000/register/',
				url:`${LinkApi}register/`,
				data: formField,
				headers: {
					'Content-type': 'multipart/form-data',
				  }
			  }).then(response=>{
					
					if(response.data.errors){
						alert('Already Registered email id!!')
					}
					else{
						alert('Registration Successfull!!')
						window.close()
					}
				})
			 }
			catch{
			   alert('Server Down!! Contact Admin')
			 }
			}
			else{
				alert('Password and Confirm Password Not Matching')
			}
			}
		}
		else{
			alert('Change the image dimension to 378 width and 508 height and reduce the size  of Image less than 100kb');
		}
	}
	  useEffect(()=>{
		LoadExternalScript(['../../../loginvendor/jquery/jquery-3.2.1.min.js','../../../loginjs/main.js']);
		// return()=>{UnloadExternalScript(['loginvendor/jquery/jquery-3.2.1.min.js','loginjs/main.js']);}
		},[])
		
		
return (  
	
	<>
   <div className='login'>
    <div className="limiter">
		<div className="container-login100">
			<div className="card wrap-login100" style={{height:'650px'}}>
	         <div className="login100-pic position-relative">
	        	<img  src='../../../logo.jpg' alt='logo' style={{marginTop:'150px'}}/>
				{/* <img  src={portr} alt='logo' /> */}
			</div>
            <form className="login100-form validate-form" onSubmit={handleSubmit}>
					<span className="login100-form-title">
						Register
					</span>
        
                    <div className="wrap-input100 validate-input" data-validate = "name required">
						<input className="input100" type="text" name="name" placeholder="name" onChange={(e) => setname(e.target.value)}/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-user-circle" aria-hidden="true"></i>
						</span>
					</div>
					<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input className="input100" type="text" name="email" placeholder="Email" onChange={(e) => setemail(e.target.value)}/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div className="wrap-input100 validate-input" data-validate = "Password is required">
						<input className="input100" type="password" name="password" placeholder="Password"onChange={(e) => setpassword(e.target.value)}/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					<div className="wrap-input100 validate-input" data-validate = "Password is required">
						<input className="input100" type="password" name="crpassword" placeholder="confirm Password"onChange={(e) => setcrpassword(e.target.value)}/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
                    <div className="wrap-input100 validate-input" data-validate = "age is required:">
						<input className="input100" type="number" name="age" placeholder="age" onChange={(e) => setage(e.target.value)}/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-child" aria-hidden="true"></i>
						</span>
					</div>
                    <div className="wrap-input100 validate-input" data-validate = "qualification is required:">
						<input className="input100" type="text" name="qualification" placeholder="qualification" onChange={(e) => setqualification(e.target.value)}/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-graduation-cap" aria-hidden="true"></i>
						</span>
					</div>
                    <div className="wrap-input100 validate-input" data-validate = "phone number is required:">
						<input className="input100" type="text" name="phone number" placeholder="Phone number" onChange={(e) => setphone(e.target.value)}/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-phone" aria-hidden="true"></i>
						</span>
					</div>
                    <hr/>
                    <div className="wrap-input100 validate-input" data-validate = "image is required:">
					<input className="input100" type="file" name="image" placeholder="image" id='check' onChange={(e) => {setimage(e.target.files[0]);check()}} style={{paddingTop:'10px'}}/>
					
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-picture-o" aria-hidden="true"></i>
						</span>
						
					</div>
					<p >Required <span style={{color:"red"}}>width :378px </span>, <span style={{color:"red"}}>height :508px</span> , <span style={{color:"red"}}>size :less than 100kb</span> </p>
					<a href="https://www.resizepixel.com/reduce-image-in-kb/">Click to resize</a>
					<div className="container-login100-form-btn">
                        <button className="btn btn-primary" onClick={()=>Registration()} >
							Register
						</button>
						
					</div>
					
					
				</form>
				{/* <button className="btn btn-primary" onClick={()=>check()}>
							chel
						</button> */}
			</div>
		</div>
		</div>
	</div> 
    </>
    );
}
export default Register;
