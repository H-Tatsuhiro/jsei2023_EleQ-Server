import { useState } from "react";
import { useForm } from "react-hook-form";

function Question() {
    const [encodedImg, setEncodedImg] = useState("");

    const { register, handleSubmit, formState: { errors}} = useForm(
        {mode: "all"}
    );

    const onSubmit = (data) => {
        const jsd = JSON.stringify([{ "data" : data.text}]);

        fetch('http://localhost:5000/encode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsd
        }).then(res => res.json())
            .then(result => setEncodedImg(result[0]['data']))
    };

    return (
        <>
            <p>二次元コードに変換する質問内容を記入してください。</p>
            <form name="qf" id="qf" onSubmit={handleSubmit(onSubmit)}>
                <textarea id="qfs" rows={30} cols={150} {...register('text', {
                    required: "入力されていません。",
                    maxLength: { value:1817, message: "質問はパース用の記号 '>' と改行コード \'\\n\' も含めて1817文字までにしてください。" }
                })}></textarea>
                {errors.text && <p>エラー: {errors.text.message}</p>}
                <button type="submit" id="subbtn">変換</button>
            </form>
            <p>変換された質問内容の二次元コード</p>
            <div>
                {encodedImg !== "" ? <img src={"data:image/png;base64," + encodedImg} /> : <p>未入力</p>}
            </div>
        </>
    )
}

export default Question;