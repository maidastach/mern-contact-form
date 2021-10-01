const ContactForm = () => {
    return <div id="contact" class="contact-container p-4 mt-3">
        <div class="h1">
            Contact us
        </div>
        <p class="ms-2 pb-4">
            <small>Send through your enquiry or a feedback:</small>
        </p>
        <form class="col-md-6 offset-md-3 mt-5" id="form-inputs">
            <div class="form-floating">
                <input id="name" class="form-control" type="text" placeholder="Name" name="name"/>
                <label for="name">Name:</label>
            </div>

            <div class="form-floating">   
                <input id="email" class="form-control" type="email" placeholder="Your Email" name="email" />
                <label for="email">Email:</label>
            </div>        
            
            <div class="form-floating">
                <input id="number" class="form-control" type="text" placeholder="Phone Number" name="number"/>
                <label for="number">Number:</label>
            </div>

            <div class="form-floating">
                <input id="city" class="form-control" type="text" placeholder="Location" name="city"/>   
                <label for="city">Location:</label>
            </div>

            <div class="form-floating">     
                <textarea id="message" class="form-control textarea contact-textarea" placeholder="Message \ Special requirements" name="message"></textarea>
                <label for="message" >Message:</label>
            </div>
                    

            <div class="row justify-content-center mt-4">
                <button id="contact-button" class="col-6 btn btn-info" type="submit">SEND MESSAGE</button>
            </div>
        
        </form>
    </div>
}
  export default ContactForm;