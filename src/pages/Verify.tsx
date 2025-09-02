import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";



import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

 export default function Verify ()  {

   const [confirmed,setConfirmed]=useState(false)
   const[sendOtp] =useSendOtpMutation()
   const[verifyOtp] =useVerifyOtpMutation()

   const [timer,setTimer]=useState(20)
     
    const navigate=useNavigate()

     const location=useLocation()
         const[email]  =useState(location.state.email ||'')

          console.log('timerr',timer)
            console.log('confirmed',confirmed)


 

       
            useEffect(()=>{
                if(email&& confirmed){
                 

                   
              const timerId= setInterval(()=>{
                setTimer((prev)=> prev>0?prev-1:0)
                console.log('ticking')
                 console.log('confor',confirmed)

              },1000)

              return  ()=>clearInterval(timerId)
          

                }
            },[email,confirmed])
    


     const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })


  const onSubmit= async (data: z.infer<typeof FormSchema>)=> {
       const toastId=toast.loading('Email Is Verifying')


       try{


      const res= (await verifyOtp({email,otp:data.pin})).data;
       console.log('res',res)

        if (res?.success) {
        toast.success("OTP Verified", { id: toastId });

        navigate('/login')
        
      
      }

  

       }catch( error){
         console.log(error)

       }

     
      
      
    
  }


   const handleSendOtp=async ()=>{

     setTimer(20)
     setConfirmed(true)

       const toastId=toast.loading('OTP IS SENDING')
    try{
    
   const res=await  sendOtp({email}).unwrap()

    console.log('res from handle confi',res)

   console.log('res from handle',res)
   if(res.success){
    
    toast.success('OTP SEND',{id:toastId})
      setConfirmed(true)

   }

   

    }catch(error){
       console.log(error)

    }
   
    
    
   }

    const handleConfirmed=async ()=>{
     const toastId=toast.loading('OTP IS SENDING')
    try{
    
   const res=await  sendOtp({email}).unwrap()

    console.log('res from handle confi',res)

   console.log('res from handle',res)
   if(res.success){
    
    toast.success('OTP SEND',{id:toastId})
      setConfirmed(true)

   }

   

    }catch(error){
       console.log(error)

    }
    
   }


    useEffect(()=>{
        

        if(!email){
            navigate('/login')

        }

    },[])

   
  return <div className="flex items-center justify-center min-h-screen">

    {confirmed?
    (<Card className=" mx-auto w-full max-w-sm">
      <CardHeader>
         <CardTitle>Verify Your mail  address</CardTitle>
        <CardDescription>
         Please enter the six digit code we sent to <br/> 
         </CardDescription>
       
      </CardHeader>
      <CardContent>
             <Form {...form}>
      <form id='otp-form' onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
         <FormField
          control={form.control}
         name="pin"
          render={({ field }) => (

            <FormItem>
             <FormLabel>One-Time Password</FormLabel>
             <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                  
                  </InputOTPGroup>
                 <InputOTPGroup>
                   <InputOTPSlot index={1} />
                     </InputOTPGroup>            <InputOTPGroup>
                   <InputOTPSlot index={2} />
                  
                 </InputOTPGroup>
                  <Dot/>
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                  
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                  
                  </InputOTPGroup>
                 <InputOTPGroup>
                   <InputOTPSlot index={5} />
                  
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
              <Button 
                          type="button"
                          onClick={handleSendOtp}
                      
                          variant="link"
                          disabled={timer !== 0}
                           className={cn('p-0 m-0',
                            {
                            "cursor-pointer": timer === 0,
                            "text-gray-500": timer !== 0,
                          }
                            
                           )}
                         
                        >
                          Resent OPT:{timer}
                        </Button>{" "}
              </FormDescription>
             <FormMessage />
           </FormItem>
          )}
        />
   
      </form>
    </Form>
      
      </CardContent>
           <CardFooter className="flex-col gap-2">
        <Button form="otp-form" type="submit" className="w-1.2">
       Submit
       </Button>
       <Button variant="outline" className="w-full">
          Login with Google
        </Button>
     </CardFooter>

  </Card>) :
  ( <Card className="mx-auto  w-full max-w-sm">
      <CardHeader>
        <CardTitle>Verify Your mail  address</CardTitle>
        <CardDescription>
        We will send you an OTP  at  the Email 
        </CardDescription>
       
      </CardHeader>
    
        <CardFooter >
        <Button  onClick={handleConfirmed} type="submit" className="w-full">
          confirm
        </Button>
       
      </CardFooter>

    </Card>)
    
 }



    



    

    
  </div>
};
