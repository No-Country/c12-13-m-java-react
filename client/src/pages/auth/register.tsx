import { Main } from "@/components";
import userRegister from "@/hooks/useRegister";


const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

  e.preventDefault()


}


export default function Home() {

  const {
    error,
    handleFirstName,
    handleLastName,
    handleUserName,
    handleConfirmPassword,
    handleEmail,
    handlePassword,

  } = userRegister()

  console.log(error)

  return (
    <Main>
      <div style={{width: "100%", display:"flex",justifyContent:"center"}}>
        <div style={{width:"500px", height:"500px", backgroundColor: "gray", margin:"auto"}}>
            <form onSubmit={handleSubmit} style={{padding:"5px", display:"flex", flexDirection:"column", gap: "10px", alignItems:"center", justifyContent:"center"}}>
              <div>
                <label>firstName</label>
                <input
                onChange={handleFirstName}
                type="text"
                name="firstName" />
                </div>  
                {error.firstName ? <p>{error.firstName}</p> : null}
                <div>
                <label>LastName</label>
                <input
                type="text"
                onChange={handleLastName}
                name="lastName" />
                </div>  
                {error.lastName ? <p>{error.lastName}</p> : null}
                <div>
                <label>UserName</label>
                <input 
                type="text"
                onChange={handleUserName}
                name="userName"
                />
                </div>  
                {error.userName ? <p>{error.userName}</p> : null}
                <div>
                <label>Password</label>
                <input 
                type="password"
                name="password"
                onChange={handlePassword}
                autoComplete="new-password" />
                </div>  
                {(error.password)? error.password : null }
                <div>
                <label>RepeatPassword</label>
                <input 
                type="password"
                onChange={handleConfirmPassword}
                autoComplete="new-password"
                name="password2"
                 />
                </div>  
                <div>
                <label>Email</label>
                <input 
                type="email"
                onChange={handleEmail}
                name="email" />
                </div>  
                {(error.email) ? "{error.emai}": null}
                <button style={{border:"none", backgroundColor: "red"}}>SUBMIT</button>
            </form>
        </div>
      </div>
    </Main>
  );
}
