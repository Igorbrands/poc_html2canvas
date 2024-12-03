import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import Rascunho from "./rascunho.png";

import html2canvas from "html2canvas";

function App() {

    const [formData, setFormData] = useState({
        name: "",
        message: "",
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        const block = document.getElementById("renderedBlock");

        try {
          const canvas = await html2canvas(block);
          const imgData = canvas.toDataURL("image/png");

          // Cria um link para download
          const downloadLink = document.createElement("a");
          downloadLink.href = imgData;
          downloadLink.download = "rendered-block.png";
          downloadLink.click();
        } catch (error) {
          console.error("Erro ao gerar a imagem:", error);
        }
      };

    return (
        <div className="App">

            <div style={{ padding: "20px" }}>
                {/* Formulário */}
                <form onSubmit={handleSubmit}>
                    <label>
                        Nome:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            style={{ display: "block", marginBottom: "10px" }}
                        />
                    </label>
                    <label>
                        Mensagem:
                        <input
                            type="text"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            style={{ display: "block", marginBottom: "10px" }}
                        />
                    </label>
                    <label>
                        Data:
                        <input
                            type="date"
                            name="data"
                            value={formData.data}
                            onChange={handleChange}
                            style={{ display: "block", marginBottom: "10px" }}
                        />
                    </label>
                    <button type="submit">Salvar como Imagem</button>
                </form>
                <div
                    id="renderedBlock"
                    style={{
                        marginTop: "20px",
                        padding: "20px",
                        border: "1px solid #ccc",
                        backgroundColor: "#f9f9f9",
                        textAlign: "center",
                    }}
                >
                    <img src={Rascunho} />
                    <p>{formData.name || "Seu Nome Aqui"}</p>
                    <p>{formData.message || "Sua Mensagem Aqui"}</p>
                    <p>{formData.data || "Sua Data"}</p>
                    <p>{formData.message || "Sua Mensagem Aqui"}</p>
                </div>
            </div>
        </div>
    );
}

export default App;
