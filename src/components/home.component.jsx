import React, { useState } from "react";
import { read, utils } from 'xlsx';
import './table.css'

const HomeComponent = () => {

    const [loading, setLoading] = useState();

    const [title, setTitle] = useState([]);

    const [newObj, setnewObj] = useState({});

    const [isDisable, setIsDisable] = useState(true);

    const [isAdicionarLinha, setAdicionarLinha] = useState(false);

    function handleClick() {
    }


    var [movies, setMovies] = useState([]);

    const handleImport = ($event) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            setLoading(true)
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    setMovies(rows)

                    var titles = [];

                    try {
                        titles = Object.keys(rows[0]);
                        setTitle(titles)
                    } catch (error) {
                        alert("This document doesn't have columns")
                        setLoading(false)
                    }

                    setTitle(titles)

                }
            }
            setLoading(false)
            reader.readAsArrayBuffer(file);
        }
    }


    const handleAddLinha = ($event, key) => {
        test(key, $event);
    }

    const Editar = () => {
        setIsDisable(!isDisable);
    }

    const AdicionarColuna = () => {
    }

    const AdicionarLinha = () => {
        setAdicionarLinha(true);
    }

    const scrollGo = (index) => {

        console.log(index)

        document.getElementById(index.toString()).scrollIntoView({ behavior: 'instant' });
    }


    const ConfirmarAdicionarLinha = () => {

        var teste = [...movies, newObj]

        var aaaa = teste.reverse();

        scrollGo("asdasdasdas")

        setMovies(aaaa);
    }

    const test = (key, value) => {

        var a = new Object();

        a = newObj;

        a[key] = value;

        if (newObj[key] !== key) {
            a[key] = value;
        }

        setnewObj(a);
    }

    return (
        <div className='h-screen bg-slate-200 pt-20'>
            <div className=" flex items-center w-5/6 mx-auto mb-2 py-2">
                <div className="col-sm-6 offset-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="input-group">
                                <div className="custom-file">
                                    <input type="file" name="file" className="custom-file-input bg-blue-600 hidden" id="inputGroupFile" required onChange={handleImport}
                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                                    <label className="rounded-lg py-2 text-white px-6 bg-cyan-800 shadow-md text-sm font-bold  custom-file-label" htmlFor="inputGroupFile">IMPORT</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                title.length
                    ? (

                        <span className="text-xs px-2 italic font-bold absolute">
                            Total de colunas ({title.length})
                        </span>
                    ) : (
                        <span></span>
                    )
            }
            <div className="row w-5/6 mx-auto h-4/5 bg-slate-50 rounded-lg shadow-2xl flex flex-col items-center justify-center py-10">
                <div>
                    <button onClick={Editar} className="bg-slate-100 p-1 mr-2 text-sm px-2 font-bold text-gray-500 shadow-md">
                        Editar
                    </button>
                    <button onClick={AdicionarLinha} className="bg-slate-100 p-1 mr-2 text-sm px-2 font-bold text-gray-500 shadow-md">
                        Adicionar Linha
                    </button>
                    <button onClick={AdicionarColuna} className="bg-slate-100 p-1 mr-2 text-sm px-2 font-bold text-gray-500 shadow-md">
                        Adicionar Coluna
                    </button>

                    total linhas : {movies.length}
                </div>

                {
                    loading ? (
                        <div className="loader mx-auto"></div>
                    )
                        : (
                            <table className="mx-auto shadow-md w-5/6 bg-white flex items-center justify-center flex-col relative px-10">

                                <thead>
                                    <tr>
                                        {
                                            title.length
                                                ?
                                                title.map((title, index) => (
                                                    <td className='text-center w-5/6 text-sm border py-2 px-5' key={index}>{title}</td>
                                                ))
                                                :
                                                <tr>
                                                    <td colSpan="5" className="text-center"></td>
                                                </tr>
                                        }
                                    </tr>
                                </thead>
                                <tbody className="h-5/6 overflow-y-scroll">

                                    <tr className="w-full bg-cyan-50 flex">
                                        {
                                            isAdicionarLinha && (
                                                title.map((x, i) => (
                                                    <input id={x + i} onChange={event => handleAddLinha(event.target.value, x)} />
                                                ))
                                            )
                                        }
                                        <td onClick={handleClick} className="cursor-pointer p-4 rounded-lg bg-cyan text-2xl shadow-md  text-white bg-cyan-600 font-black">+</td>
                                    </tr>
                                    {

                                        title.length
                                            ?
                                            movies.map((movie, index) => (
                                                <tr key={index} id={index.toString()}>
                                                    {index.toString()}
                                                    {
                                                        title.map((t, i) => (
                                                            <td className='text-center w-auto text-sm border p-0'>
                                                                <input disabled={isDisable} className="caret-cyan-500 px-4 py-2 border-0  outline-cyan-500" defaultValue={movie[title[i]]} />
                                                            </td>
                                                        ))
                                                    }
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td colSpan="5" className="text-center ">SELECT A CSV/XLXS FILE...</td>
                                            </tr>
                                    }
                                    <div id="asdasdasdas"></div>
                                </tbody>
                            </table>

                        )
                }
                <button onClick={ConfirmarAdicionarLinha}>Reload</button>
            </div>
        </div >
    );
};

export default HomeComponent;
