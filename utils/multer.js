import multer from "multer"
import path from 'path'


const storage = multer.diskStorage( {
    destination: function ( req, file, cb ) {
        cb( null, 'uploads/' )
    },
    filename: function ( req, file, cb ) {
        const uniqueSuffix = Date.now() + '-' + Math.round( Math.random() * 159 )
        cb( null, file.fieldname + '-' + uniqueSuffix )
    }
} )




function checkFileType( file, cb ) {
    const filetypes = /jpeg|jpg|txt|png|gif|pdf/;
    const extname = filetypes.test( path.extname( file.originalname ).toLowerCase() );
    const mimetype = filetypes.test( file.mimetype );

    if ( mimetype && extname ) {
        return cb( null, true );
    } else {
        cb( 'Error: Images and PDFs only!' );
    }
    console.log( "Hii" )
}

export const uploads = multer( {
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function ( req, file, cb ) {
        checkFileType( file, cb );
    }
} )


export default uploads