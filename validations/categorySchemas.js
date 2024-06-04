import * as Yup from 'yup'


const MAX_FILE_SIZE = 102400; //100KB
// const MAX_FILE_SIZE = 2000000; 2MB

const validFileExtensions = { image: [ 'gif', 'png', 'jpeg', 'svg', 'webp'] };

function isValidFileType(fileName, fileType) {
    return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}

export const createCategorySchema = Yup.object().shape({
    name: Yup.string().required("عنوان دسته بندی الزامی می باشد")
        .min(3, "عنوان دسته بندی نباید کمتر از 3 کاراکتر باشد"),
        // image: Yup
        //     .mixed()
        //     .required("Required")
        //     .test("is-valid-type", "Not a valid image type",
        //         value => isValidFileType(value && value.name.toLowerCase(), "image"))
        //     .test("is-valid-size", "Max allowed size is 100KB",
        //         value => value && value.size <= MAX_FILE_SIZE)
})