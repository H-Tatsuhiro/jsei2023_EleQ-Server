import { useState } from "react";
import { useForm } from "react-hook-form";

function Statistics(props) {
    const questions = props.questions;
    const answers = props.answers;
    const [statsImg, setStatsImg] = useState("");

    const { register, handleSubmit, formState: { errors }} = useForm(
        {mode: "all"}
    );

    const createRadio = (title, i) => {
        if (i !== 0) {
            return (
                <div key={i}>
                    <input type="radio" {...register('check', { required: true })} value={i} />
                    {title}
                </div>
            )
        }
    };

    const onSubmit = (data) => {
        const checked = data['check'];
        const sendData = [];
        for (let i = 1; i < answers.length; i++) {
            sendData.push(answers[i][checked - 1])
        }

        const jsd = JSON.stringify([{"data": sendData}]);
        fetch('http://localhost:5000/stats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
           },
            body: jsd
        }).then(res => res.json())
            .then(result => setStatsImg(result[0]['data']))
    }

    return (
      <>
          <p>統計グラフ画像出力（回答が量的データである質問を1つ選択してください。質的データを選んだ場合は予期せぬエラーが生じます。）</p>
          <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                  {
                      questions.map((data, index) => {
                          return createRadio(data, index);
                  })
              }
              </div>
              <button type="submit">出力</button>
          </form>

          <div>
              {statsImg !== "" ? <img src={"data:image/png;base64," + statsImg} /> : <p>未出力</p>}
          </div>
      </>
    );
}

export default Statistics;

