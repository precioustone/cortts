export const Template = (props) => {
    return (`<!DOCTYPE html>
        <html>
            <head><title>First Pdf</title> 
            <style>
                p {
                    color: #ed4395;
                }
            </style>
            </head>
            <body>
                <p>${props.name}</p>
                <p>${props.age}</p>
                <p>${props.game}</p>
            </body>
        </htm>
    `);
}