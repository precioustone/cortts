export const Template = (props) => {
    return (`
        <html>
            <head><title>First Pdf</title> </head>
            <body>
                ${props.name}
                ${props.age}
                ${props.game}
            </body>
        </htm>
    `);
}