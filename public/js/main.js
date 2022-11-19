"use strict"
import hoge from './lib/test.js'

console.log('Hello World !!');
hoge()

/**
 * 
 * @param {SubmitEvent} e 
 */
const onSubmit = async e => {
    
    e.preventDefault()

    const nameInput = e.target.querySelector('input[name="image-name"]')
    const fileInput = e.target.querySelector('input[name="image-file"]')
    console.log(nameInput.value);
    console.log(fileInput.files);

    const formdata = new FormData()

    formdata.append('image-name', nameInput.value)
    for await(const [i, v] of Object.entries(fileInput.files)) {
        formdata.append('image-file' , v);
    }

    const post = await fetch('/upload', {
        method:'post',
        body: formdata
    })

    console.log(await post.text());
}

const init = () => {
    document.getElementById('upload-form').addEventListener('submit', onSubmit)
}

window.addEventListener('load', init)