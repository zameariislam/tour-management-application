

import { Button } from "@/components/ui/Button";
import { CalendarIcon, Plus, Trash2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useAddTourMutation, useGetTourTypesQuery } from "@/redux/features/tour/tour.api";



import { zodResolver } from "@hookform/resolvers/zod";




import {  useFieldArray, useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { format } from "date-fns";

import { useState } from "react";
import MultipleImageUploader from "@/components/MultipleImageUploader";

const tourSchema = z.object({
  title: z.string().min(1, "Title is required"),
  
  division: z.string().min(1, "Description is required"),
   tourType: z.string().min(1, "Description is required"),
  description: z.string().min(1, "Description is required"),
    startDate: z.date({ message: "Start date is required" }),
  endDate: z.date({ message: "End date is required" }),
  inCluded: z.array(z.object({ value: z.string() })),
 
  
  
 
});

export default function AddTour() {

  const[images,setImages] = useState <File[]|[]>([])

   const {data:divisionData,isLoading:divisionLoading}= useGetDivisionsQuery(undefined)
   const {data:tourType,isLoading:tourTypeLoading}= useGetTourTypesQuery(undefined)

    const[addTour]=useAddTourMutation()
  
        

 
  const form = useForm<z.infer<typeof tourSchema>>({
    resolver: zodResolver(tourSchema),
    defaultValues: {
      title: "Cox's Bazar Beach Adventure",
      description:
        "Experience the world's longest natural sea beach with golden sandy shores, crystal clear waters, and breathtaking sunsets. Enjoy beach activities, local seafood, and explore nearby attractions including Himchari National Park and Inani Beach.",
     
      division:'Dhaka',
      tourType:'Swimming Tour',
      startDate:new Date(),
      endDate: new Date(),
      
     inCluded:[]
     

    },
    
  });

 const { fields:inCludedFields, remove:removeInCluded, append:appendInCluded} = useFieldArray({
    control:form.control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "inCluded", // unique name for your Field Array
  });
      

   console.log('fields',inCludedFields)

  const handleSubmit:SubmitHandler<FieldValues> = async (data) => {

    
  

   
    const tourData = {
  ...data,
  startDate: data.startDate?.toISOString(),
  endDate: data.endDate?.toISOString(),
  inCluded:data.inCluded?.map((item:{value:string} )=>item.value)
    };
    
     console.log('tourdata',tourData)


     const formData= new FormData()

     images.forEach(image=> formData.append('files',image))
     formData.append('data',JSON.stringify(tourData))

      const toastId = toast.loading("Creating tour....");
    try {


     const tour= await addTour(formData).unwrap();

      console.log('tour',tour)

     toast.success('tour created sucessfully ..',{id:toastId})


    
      
    } catch (error: unknown) {

      
        toast.error( error?.data?.message,{id:toastId})
      console.error( 'error', error);
      
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-5 mt-16">
      <Card>
        <CardHeader>
          <CardTitle>Add New Tour</CardTitle>
          <CardDescription>Add a new tour to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="add-tour-form"
              className="space-y-5"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tour Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*  */}
              <div className="flex gap-5 ">
              <FormField
             control={form.control}
              name="division"
          render={({ field }) => (
            <FormItem  className="flex-1">
              <FormLabel>Divisions</FormLabel>
              <Select disabled={divisionLoading}  onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a division " />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  
                    {
                      divisionData?.data?.map((division: { name: string ,_id:string}) => <SelectItem  key={division._id} value={division._id}>{division.name}</SelectItem>)
                    }
                </SelectContent>
              </Select>


              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tourType"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Tour Type</FormLabel>
              <Select disabled={tourTypeLoading} onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select  tour type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                { tourType?.map((tour:{name:string, _id:string })=> <SelectItem key={tour._id} value={ tour._id}>{tour.name}</SelectItem>) } 
                
                </SelectContent>
              </Select>
              {/* <FormDescription>
                You can manage email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
               
              </div>

              <div  className="flex gap-5">

                 <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col flex-1">
              <FormLabel>Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    
                      disabled={(date) =>
                              date <
                              new Date(
                                new Date().setDate(new Date().getDate() - 1)
                              )}

                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
             
              <FormMessage />
            </FormItem>
          )}
        />
        
                 <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col flex-1">
              <FormLabel>End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                     disabled={(date) =>
                              date <
                              new Date(
                                new Date().setDate(new Date().getDate() - 1)
                              )}
                    
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
             
              <FormMessage />
            </FormItem>
          )}
        />
              </div>
             
                
                        
            </form>
             <div className="flex gap-2 ">
                  <div className=" flex-1">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="h-[205px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              
              </div>

              <div className="flex-1 mt-5">
                 <MultipleImageUploader  onChange={setImages} />
                </div>   
                 </div>

                  <div className="w-full bg-amber-300 border-2">
                    
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <p className="font-semibold" >inCluded</p>
                         <Button size='icon'  onClick={()=>  appendInCluded({value:''})} type="button"> <Plus/></Button>
                    </div>
                    
                  </div>

                  <div className="space-y-4 mt-1.5">
                   {
                    inCludedFields?.map((item,index)=>  <div className="flex gap-4" key={item.id} >

                  
                          <FormField  
                control={form.control}
                name={`inCluded.${index}.value`}
                render={({ field }) => (
                  <FormItem  className="flex-1" >
                   
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> 
                 
            
                <Button type="button"  size='icon' variant={"destructive"}  onClick={()=>removeInCluded(index)} > <Trash2/> </Button>
              
                    </div>
                      
                    
              
                    
                       
            )
                 
                   }



                  </div>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" form="add-tour-form">
            Create Tour
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}