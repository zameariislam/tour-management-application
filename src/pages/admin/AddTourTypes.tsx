import { AddTourModal } from "@/components/modules/admin/TourType/AddTourModal";
import { Button } from "@/components/ui/Button";
import { DeleteConfirmation } from "@/components/ui/DeleteConfirmation";
import {
  Table,
  TableBody,
 
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useGetTourTypesQuery, useRemoveTourTypeMutation } from "@/redux/features/tour/tour.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

 export default function AddTourTypes ()  {

      const {data}=useGetTourTypesQuery(undefined)

      const[removeTourType]=useRemoveTourTypeMutation()

       const handleConfirmation= async(id:string)=>{

        try{
           const toastId= toast.loading('Removing.....')
           const result= await  removeTourType(id).unwrap()
            if(result?.success){
              toast.success('T Removed successfully',{id:toastId})
            }

        }catch(err:any){

          toast.error(err)

        }
              
      

       }
     

  return (
    <div className=" w-full max-w-7xl mx-auto px-5"> 

    <div className="flex justify-between ">
        <h1 className="text-xl font-semibold">Tour Types</h1>

        <AddTourModal/>
        {/* <Button>Add Tour Types</Button> */}
    </div>
    <div className="border border-muted rounded-md">
        <Table>
 
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Name</TableHead>
    
      <TableHead className="text-right">Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    { data?.map((item:{name:string, _id:string})=><TableRow key={item._id}>
      <TableCell className="font-medium w-full">{item.name}</TableCell>
       <TableCell className="font-medium">
      
         <DeleteConfirmation  onConfirm={()=> handleConfirmation(item._id) } >  
          <Button>
            <Trash2/>
           
          </Button>
        
         </DeleteConfirmation>
       </TableCell>
     
    </TableRow>)}
  </TableBody>
</Table>

    </div>


    </div>
  );
};
