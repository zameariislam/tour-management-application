import { AddTourModal } from "@/components/modules/admin/TourType/AddTourModal";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import { Trash2 } from "lucide-react";

 export default function AddTourTypes ()  {

      const {data}=useGetTourTypesQuery(undefined)
       console.log('tourtypes',data)

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
        <Button>
            <Trash2/>
        </Button>
       </TableCell>
     
    </TableRow>)}
  </TableBody>
</Table>

    </div>


    </div>
  );
};
