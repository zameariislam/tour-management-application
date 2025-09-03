
import { Button } from "@/components/ui/Button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
import { Label } from "@/components/ui/label"
import { useAddTourTypeMutation } from "@/redux/features/tour/tour.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const tourTypeSchema = z.object({
  
   name: z.string().min(5,{error:'Tour Type name is too short'}),
  
})

export function AddTourModal() {
   const[addTourType]=useAddTourTypeMutation()


   const form = useForm<z.infer<typeof tourTypeSchema>>({
          resolver: zodResolver(tourTypeSchema),
          defaultValues: {
        name: " ",
      
      },
        })


         const onSubmit= async(values: z.infer<typeof tourTypeSchema>)=> {

          try{
             

            const  res= await addTourType(values).unwrap()
            
                  if (res?.data?.success) {
                    toast.success("Tour Type Created successfully");
                 
                     
                   
                  }
          

          }catch(err){
              if (err?.data?.message==="User does not Verified")
      {
         console.log('error from login',err)
    
            
   
      }

          }
        
         
          };
        
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button >Add Tour Type</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Tour Type</DialogTitle>
           
          </DialogHeader>


           <Form {...form}>
                    <form id='add-tour-type' onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          
                     
          
                      
                    </form>
                  </Form>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
               <Button form="add-tour-type" type="submit">Save changes</Button>
            </DialogClose>
          
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
