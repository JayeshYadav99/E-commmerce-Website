import  DatauriParser from 'datauri/parser'
import path from 'path'
const getDatauri=(file)=>{
    const parser = new DatauriParser();
   
    const extName=path.extname(file.originalName).toString();
    console.log(extName);
    return parser.format(extName,file.content)
}
export default  getDatauri;