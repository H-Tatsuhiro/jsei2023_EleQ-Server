import { useForm } from "react-hook-form";

function SubAnswerImg(props) {
    const { register, handleSubmit, formState: { errors }} = useForm(
        {mode: "all"}
    );

    const onSubmitAnswerImg = () => {
        const uploadImage = document.querySelector('#aImg')
        const file = uploadImage.files[0]

        const reader = new FileReader()
        reader.onload = (event) => {
            const base64Text = event.currentTarget.result.split(',')[1]
            const jsd = JSON.stringify([{ "data" : base64Text}]);
            fetch('http://localhost:5000/decode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsd
            }).then(res => res.json())
                .then(result => props.setAnswer(result))
        }
        reader.readAsDataURL(file)
    };

    return (
        <>
            <p>回答内容の二次元コードの読み取り (複数の回答結果を読み込む場合、読み込み結果が反映されてから新たなファイルを続けて読み込んでください。）</p>
            <form onSubmit={handleSubmit(onSubmitAnswerImg)}>
                <input type="file" id="aImg" {...register('file', {
                    required: "回答内容についての二次元コードが含まれた画像ファイルを選択してください。"
                })}/>
                {errors.file && <p>エラー: {errors.file.message}</p>}
                <button type="submit">読み取る</button>
            </form>

        </>
    );
}

export default SubAnswerImg;