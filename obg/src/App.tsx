import CircularProgress from "./components/circulateProgress";
import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  Typography,
  Button,
} from "@material-ui/core";
import logo from "./assets/logo.png"
import done from "./assets/done.png"


export default function App() {
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [age, setAge] = useState();
  const [goal, setGoal] = useState("");
  const [active, setActive] = useState("");
  const [isCalculator, setIsCalculator] = useState(true);
  const [isBarProgress, setIsBarProgress] = useState(false);
  const [IsResult, setIsResult] = useState(false);
  const [comment, setComment] = useState("")

  const calculateTaxa = () => {
    if(weight === undefined || height === undefined || age === undefined) return 
    if (gender === "male") {
      return (66 + 13.8 * weight + 5 * height - 6.8 * age).toFixed(0).toString() + " Calorias";
    } else {
      return (665 + 9.6 * weight + 1.8 * height - 4.7 * age).toFixed(0).toString() + " Calorias";
    }
  };

  const calculateIMC = () => {
    if(weight === undefined || height === undefined) return 
    return ((weight / (height * height)) * 10000).toFixed(1).toString();
  };

  const calculatePesoIdeal = () => {
    if(height === undefined) return
    //PI = IMC desejado x (Altura x Altura)
    return ((23 * (height * height)) / 10000).toFixed(2).toString() + "Kg";
  };
  const calculateTDEE = () => {
    if(weight === undefined || height === undefined || age === undefined) return 
    //TMB = 10 * (peso) + 6.25 * (altura) – 5 * (idade) – 161
    //TDEE = TMB * nível de atividade física
    return ((10 * weight + 6.25 * height - 5 * age) * 1.375).toFixed(0).toString() + " Calorias";
  };

  if (isCalculator || isBarProgress) {
    const handleSubmit = (event: any) => {
      event.preventDefault();
      if(gender === "") {
        setComment("Você precisa colocar o seu gênero")
        return
      }
      if(!weight || weight <= 0 ) {
        setComment("Você precisa colocar o seu peso")
        return
      }
      if(!height || height <= 0) {
        setComment("Você precisa colocar a sua altura")
        return
      }
      if(!age || age <= 0) {
        setComment("Você precisa colocar a sua idade")
        return
      }
      setIsCalculator(false);
      setIsBarProgress(true);
      setTimeout(() => (setIsBarProgress(false), setIsResult(true)), 5700);
    };

    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center"
          }}
        >
        <Typography
          variant="h6"
          style={{
            display: "flex",
            height: "180px",        
          }}
          gutterBottom
        >
          <img src={logo} alt="logo" style={{height:"100%"}}/>
        </Typography>
          <Typography
            style={{ display: "flex", justifyContent: "center" }}
            variant="h5"
            gutterBottom
          >
            Parabéns pela decisão de entrar para o Protocolo Queima Metabólica
          </Typography>
          {isCalculator && <Typography
            style={{ display: "flex", justifyContent: "center" }}
            variant="h6"
            gutterBottom
          >
            Coloque seus dados abaixo para nossa equipe montar o seu Protocolo
          </Typography>}
          {isBarProgress && <Typography
            style={{ display: "flex", justifyContent: "center" }}
            variant="h6"
            gutterBottom
          >
            Nossa equipe já está montando o seu protocolo...
          </Typography>}
          <div> 
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems:"center",
                background: "#f0f0f0",
                minHeight: "400px",
                minWidth: "300px"
              }}
            >
              {isCalculator && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop:"5%"
                    //minWidth: "70%"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "10px",
                      justifyContent: "center",
                      padding: "0px 30px"
                    }}
                  >
                    <div style={{ minWidth: "220px", marginTop:"10px" }}>
                      <FormControl 
                      fullWidth
                      >
                        <TextField
                          variant="outlined"
                          value={gender }
                          onChange={(event) => setGender(event.target.value as any)}
                          select
                          label="Gênero"
                        >
                          <MenuItem value="male">Masculino</MenuItem>
                          <MenuItem value="female">Feminino</MenuItem>
                        </TextField>
                      </FormControl>
                    </div>

                    <div style={{ minWidth: "220px" }}>
                      <TextField
                        label="Peso (kg)"
                        type="number"
                        value={weight}
                        onChange={(event) => setWeight(event.target.value as any)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      marginBottom: "20px",
                      flexWrap: "wrap",
                      gap: "10px",
                      justifyContent: "center",
                      padding: "0px 30px"
                    }}
                  >
                    <div style={{ minWidth: "220px" }}>
                      <TextField
                        label="Altura (cm)"
                        type="number"
                        value={height}
                        onChange={(event) => setHeight(event.target.value as any)}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        //style={{ marginRight: "25px" }}
                      />
                    </div>

                    <div style={{ minWidth: "220px" }}>
                      <TextField
                        label="Idade"
                        type="number"
                        value={age}
                        onChange={(event) => setAge(event.target.value as any)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "20px",
                      flexWrap: "wrap",
                      gap: "10px",
                      justifyContent: "center",
                      padding: "0px 30px"
                    }}
                  >
                    <div style={{ minWidth: "220px", maxWidth:"220px" }}>
                      <FormControl
                        fullWidth
                        style={{ marginRight: "25px", marginBottom: "15px", textOverflow: 'ellipsis' }}
                        variant="outlined"
                      >
                        <TextField
                          variant="outlined"
                          value={goal}
                          onChange={(event) => setGoal(event.target.value)}
                          select
                          label="Objetivo"
                        >
                          <MenuItem value="emagrecerM">Emagrecer moderadamente</MenuItem>
                          <MenuItem value="emagrecerR">Emagrecer rápido</MenuItem>
                          <MenuItem value="emagrecerSR">Emagrecer super-rápido</MenuItem>
                        </TextField>
                      </FormControl>
                    </div>

                    <div style={{ minWidth: "220px" }}>
                      <FormControl fullWidth variant="outlined">
                      <TextField
                          variant="outlined"
                          value={active}
                          onChange={(event) => setActive(event.target.value as any)}
                          select
                          label="Nível de Atividade Física"
                        >
        
                          <MenuItem value="Sedentário">Sedentário</MenuItem>
                          <MenuItem value="Levemente Ativo">
                            Levemente Ativo
                          </MenuItem>
                          <MenuItem value="Moderadamente Ativo">
                            Moderadamente Ativo
                          </MenuItem>
                          <MenuItem value="Muito Ativo">
                            Muito Ativo
                          </MenuItem>
                          <MenuItem value="Extremamente Ativo">
                            Extremamente Ativo
                          </MenuItem>
                        </TextField>
                      </FormControl>
                    </div>
                    <Button
                      variant="contained"
                      style={{
                        marginTop: "15px",
                        width: "100%",
                        background: "#008c8c",
                        color: "#fff"
                      }}
                      onClick={handleSubmit}
                    >
                      Gerar Protocolo
                    </Button>
                    <span style={{color: 'red'}}>
                      {comment}
                    </span>
                  </div>
                </div>
              )}
              {isBarProgress && <CircularProgress />}
            </form>
          </div>
        </div>
      </>
    );
  }

  if (IsResult) {
    return (
      <>
        <Typography
          variant="h6"
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            height: "140px",         
          }}
          gutterBottom
        >
          <img src={logo}/>
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection:"column",
            justifyContent: "center",
            alignItems:"center",
          }}
        >
          <div style={{ display: "flex", 
                        flexDirection:"column",
                        justifyContent: "center",
                        alignItems:"center", 
                        background: "#f0f0f0",
                        minWidth:"300px",
                        maxWidth:"700px",
                        minHeight:"400px" }}>
            <Typography
              variant="h6"
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
                marginLeft:"5%"
              }}
              gutterBottom
            >
              Você precisa de {calculateTDEE()}
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "90%"
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginBottom: "20px",
                  flexWrap: "wrap",
                  gap: "10px",
                  justifyContent: "center"
                }}
              >
                <div style={{ minWidth: "80px" }}>
                  <TextField
                    label="Taxa Metabólica Basal"
                    type="string"
                    value={calculateTaxa()}
                    onChange={(event) => setHeight(event.target.value as any)}
                    variant="outlined"
                    margin="normal"
                    disabled={true}
                    fullWidth
                    //style={{ marginRight: "25px" }}
                  />
                </div>

                <div style={{ minWidth: "80px" }}>
                  <TextField
                    label="TDEE"
                    type="string"
                    value={calculateTDEE()}
                    onChange={(event) => setAge(event.target.value as any)}
                    disabled={true}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    //style={{ marginRight: "25px" }}
                  />
                </div>

                <div style={{ minWidth: "80px" }}>
                  <TextField
                    label="IMC"
                    type="string"
                    value={calculateIMC()}
                    onChange={(event) => setAge(event.target.value as any)}
                    disabled={true}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    //style={{ marginRight: "25px" }}
                  />
                </div>
                <div style={{ minWidth: "80px" }}>
                  <TextField
                    label="Peso Ideal"
                    type="string"
                    value={calculatePesoIdeal()}
                    onChange={(event) => setAge(event.target.value as any)}
                    disabled={true}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                </div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "30px"
                }}
              >
                  <img src={done} style={{width:"80px"}}/>
                <Typography variant="h6" gutterBottom>
                O seu Protocolo já está pronto te esperando na área de membros. Acabamos de enviar o seu acesso para o e-mail cadastrado (se não encontrá-lo, pesquise por “Kiwify”). Estamos ansiosos para ouvir a história da sua transformação.
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <></>
}