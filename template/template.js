export const Template = (props) => {
    return (`<!DOCTYPE html>
        <html>
            <head><title>First Pdf</title> 
            <style>
                ${
                    styles
                }
            </style>
            </head>
            <body>
            <div class="container" >
            <div style=" dusplay: flex, align-items: flex-start, flex-direction: row, justify-content: 'flex-end', padding: 15">
                <h4 style="color: #03C06A">${props.date}</h4>
            </div>
            <div class="contView" >
                <h4>Property Description/Units:</h4>
                <p>${ props.title }</p>
            </div>
            <div class="contMultView" >
                <div class="insidediv" >
                    <h4>Category:</h4>
                    <p>${ props.category }</p>
                </div>
                <div class="insidediv" >
                    <h4>Section:</h4>
                    <p>${ props.section }</p>
                </div>
            </div>
            <div class="contView" >
                <h4>Property Type:</h4>
                <p>${ props.pType }</p>
            </div>
            <div class="contMultView" >
                <div class="insidediv" >
                    <h4>Price:</h4>
                    <p>${ props.price }</p>
                </div>
                <div class="insidediv" >
                    <h4>Service Charge:</h4>
                    <p>${ props.service }</p>
                </div>
                <div class="insidediv" >
                    <h4>Caution:</h4>
                    <p>${ props.caution }</p>
                </div>
            </div>
            <div class="contMultView" >
                <div class="insidediv" >
                    <h4>No. of Bed(s):</h4>
                    <p>${ props.beds }</p>
                </div>
                <div class="insidediv" >
                    <h4>No. of Bath(s):</h4>
                    <p>${ props.baths }</p>
                </div>
                <div class="insidediv" >
                    <h4>Car park:</h4>
                    <p>${ props.park }</p>
                </div>
            </div>
            <div class="contMultView" >
                <div class="insidediv" >
                    <h4>Land Size:</h4>
                    <p>${ props.landSize }</p>
                </div>
                <div class="insidediv" >
                    <h4>Property Size:</h4>
                    <p>${ props.propSize }</p>
                </div>
            </div>
            <div class="contView" >
                <h4>Location Address:</h4>
                <p>${ props.location }</p>
            </div>
            <div class="contView" >
                <h4>Nearby Places:</h4>
                <p>${ props.nearPlace }</p>
            </div>
            <div class="contMultView" >
                <div class="insidediv" >
                    <h4>Completion Status:</h4>
                    <p>${ props.status }</p>
                </div>
                <div class="insidediv" >
                    <h4>Title:</h4>
                    <p>${ props.pTitle }</p>
                </div>
            </div>
            <div class="contView" >
                <h4>Unexpired Lease Term:</h4>
                <p>${ props.leaseTerm }</p>
            </div>
            <div class="contView" >
                <h4>E-Platform:</h4>
                <p>${ props.ePlatform }</p>
            </div>
            <div class="contMultView" >
                <div class="insidediv" >
                    <h4>No of Floors:</h4>
                    <p>${ props.floor }</p>
                </div>
                <div class="insidediv" >
                    <h4>Available Floor:</h4>
                    <p>${ props.availFloor }</p>
                </div>
            </div>
            <div class="contMultView" >
                <div class="insidediv" >
                    <h4>Link:</h4>
                    <p>${ props.link }</p>
                </div>
                <div class="insidediv" >
                    <h4>Link Contact:</h4>
                    <p>${ props.linkContact }</p>
                </div>
                <div class="insidediv" >
                    <h4>Cortts Agent:</h4>
                    <p>${ props.corttsAgent }</p>
                </div>
            </div>
            <div class="contView" >
                <h4>Features:</h4>
                <p>${ props.features }</p>
            </div>
            <div class="contView" >
                <h4>Property Description:</h4>
                <p>${ props.desc }</p>
            </div>
            <div class="contView" >
                <h4>Remark:</h4>
                <p>${ props.remark }</p>
            </div>
        </div>
            </body>
        </htm>
    `);
}

const styles = `
.container {
    display: flex;
    flex-direction: column;
 }
 h4 {
     font-family: gotham-medium;
     padding-vertical: 10px;
 }
 p {
     font-family: gotham-light;
     line-height: 20px;
 }
 .contView {
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: rgba(0,0,0,0.2);
    padding: 20;
    width: 100%;
}
 .contMultView {
     border-bottom-style: solid;
     border-bottom-width: 1px;
     border-bottom-color: rgba(0,0,0,0.2);
     padding: 20;
     width: 100%;
     display: flex;
     flex-direction: row;
     align-items: flex-start;
     justify-content: space-between;
 }
 .insideView {
     
 }
                `