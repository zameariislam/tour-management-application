
import SingleImageUploader from "@/components/SingleImageUploader";
import { Button } from "@/components/ui/Button"
import {
  Dialog,
  DialogClose,
  DialogContent,
 
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { useAddDivisionMutation } from "@/redux/features/division/division.api";


import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import z from "zod";

const divisionSchema = z.object({
  
   name: z.string().min(5,{error:'Division name is too short'}),
  description: z.string().min(5,{error:'Division description is too short'}),
  
})

export function AddDivisionModal() {
  const[image,setImage] = useState<File |null> (null)
     const[addDivision]=useAddDivisionMutation(undefined)

     const [open,setOpen]=useState(false)

   console.log('image',image)



   const form = useForm<z.infer<typeof divisionSchema>>({
          resolver: zodResolver(divisionSchema),
          defaultValues: {
        name: " ",
        description:''
      
      },
        })


         const onSubmit= async(values: z.infer<typeof divisionSchema>)=> {


            const toastId= toast.loading('Creating.....')

          try{

           

             const formdata=new FormData()
             formdata.append('data',JSON.stringify(values))
             formdata.append('file',image as File)
             
           
              const res= await addDivision(formdata).unwrap()

              //  console.log('res',res)

              
            
        
            toast.success('Division Created',{id:toastId})
            setOpen(false)

                

          }catch(error:any){

         toast.error(error?.data?.message, {id:toastId})
      
         console.log('error from login',error)
              setOpen(false)
    
            
   
      

          }
        
         
          };
        
  return (
    <Dialog open={open} onOpenChange={setOpen} >
    
        <DialogTrigger asChild>
          <Button >Add Division</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Division</DialogTitle>
           
          </DialogHeader>


           <Form {...form}>
                    <form id='add-division' onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tour Type Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Tour Type Name"
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel> Division Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tour Type Name"
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
          
                     
          
                      
                    </form>
                    <SingleImageUploader onChange={setImage}/>
                  </Form>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
           
               <Button disabled={!image} form="add-division" type="submit">Save changes</Button>
           
          
          </DialogFooter>
        </DialogContent>
     
    </Dialog>
  )
}
