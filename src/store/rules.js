import db from '@/firebase/init'

let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let phoneRegEx = /^[0-9]{11}$/;

export default {
  state: {
    email: [
      v => !!v || 'E-mail is required',
      v => emailRegEx.test(String((v).toLowerCase())) || 'E-mail must be valid',
    ],
    name: [
      v => !!v || 'Name is required',
      v => v.length >= 4 || 'Name must be less than 4 characters',
    ],
    positiveNumber: [
      v => !!v || 'Field is required',
      v => v > 0 || 'Number must be greater than 0',
    ],
    required: [
      v => !!v || 'Field is required',
    ],
    phone: [
      v => !!v || 'Field is required',
      v => phoneRegEx.test(v) || 'phone number must be 11 number',
    ],
    briefText: [
      v => v.length >= 4 || 'Field must be less than 4 characters',
    ]
  }
}