

export default function useValidateFields() {

    function validateForms(boxId, errorPosition, message) {
        let doc = document.getElementById(boxId).classList.add("border-box-red");
        console.log(doc);
        document.getElementsByClassName("texto-obligatorio-form")[errorPosition].style.display = "block";
        document.getElementsByClassName("texto-obligatorio-form")[errorPosition].innerHTML = message;
    }

    function eraseError(boxId, errorPosition) {
        document.getElementById(boxId).classList.remove("border-box-red");
        document.getElementsByClassName("texto-obligatorio-form")[errorPosition].style.display = "none";
    }

    return {
        validateForms,
        eraseError
    }
}