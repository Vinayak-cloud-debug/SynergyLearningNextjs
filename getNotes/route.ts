import { NextResponse } from "next/server"
import Notes from "../../models/notes";
import connection from "../../lib/mongodb";

export async function POST(request: Request) {


    await connection();

    const {SubjectNumber,Sem} = await request.json();
    console.log(SubjectNumber,Sem);

    if(!SubjectNumber || !Sem){
        return NextResponse.json({error:"Please provide SubjectNumber and Sem"});
    }

        try{
            var res = await Notes.find({SubjectNumber:SubjectNumber,Sem:Sem});
            if(res.length == 0){
                return NextResponse.json({error:"No notes found"});
            }
            console.log(res);
            return NextResponse.json(res);
        }
        catch(err){
            console.log(err);
            return NextResponse.json({error:"Error fetching notes"});
        }
}