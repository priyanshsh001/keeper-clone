import { useState} from 'react'
import { useAuthContext } from './useAuthContext'
 
const BASE_URl=process.env.REACT_APP_BASE_URL;
export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)
     
const response=await fetch(`${BASE_URl}/signup`,{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({email,password})
})
const json =await response.json()
if(!response.ok)
{
  setIsLoading(false)
  setError(json.error)

}
if(response.ok)
{
  // storing the user to the local storage
  localStorage.setItem('user',JSON.stringify(json))
  // updating the auth context
  dispatch({ type: 'LOGIN', payload: json})
  setIsLoading(false)
}


  }

  return { signup, isLoading, error }
}