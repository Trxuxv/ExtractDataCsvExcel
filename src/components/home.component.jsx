import React, { useState } from "react";
import { read, utils } from 'xlsx';
import './table.css'

const HomeComponent = () => {

    const [loading, setLoading] = useState();

    const [title, setTitle] = useState([]);

    const [movies, setMovies] = useState([]);

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
                                    <label className="rounded-lg py-2 text-white px-6 bg-red-800 shadow-md text-sm font-bold  custom-file-label" htmlFor="inputGroupFile">IMPORT</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <span className="text-xs px-2 italic font-bold absolute">
                Total de colunas ({title.length})
            </span>
            <div className="row w-5/6 mx-auto overflow-y-scroll h-4/5 bg-slate-50 rounded-lg shadow-2xl flex items-center justify-center">
                {
                    loading ? (
                        <div className="loader mx-auto"></div>
                    )
                        : (
                            <table className="table mx-auto shadow-md w-full bg-white flex items-center  relative justify-center">
                                <thead>
                                    <tr>
                                        {
                                            title.length
                                                ?
                                                title.map((title, index) => (
                                                    <td className='text-center w-auto font-bold p-3 shadow-md' key={index}>{title}</td>
                                                ))
                                                :
                                                <tr>
                                                    <td colSpan="5" className="text-center"></td>
                                                </tr>
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        title.length
                                            ?
                                            movies.map((movie, index) => (
                                                <tr key={index}>
                                                    {
                                                        title.map((t, i) => (
                                                            <td className='text-center w-auto text-sm border py-2 px-5'>{movie[title[i]]}</td>
                                                        ))
                                                    }
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td colSpan="5" className="text-center"></td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        )
                }
            </div>
        </div>
    );
};

export default HomeComponent;
