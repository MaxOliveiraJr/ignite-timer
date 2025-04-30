import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountButton, TaskInput } from "./styles";

export function Home() {
    return (

        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="task">Vou tralalhar em</label>
                    <TaskInput id="task" list="task-suggestions" placeholder="Dê um nome para o seu projeto" />

                    <datalist id="task-suggestions">
                        <option value="Projeto 1"></option>
                        <option value="Projeto 2"></option>
                        <option value="Projeto 3"></option>
                    </datalist>
                    <label htmlFor="minutesAmount"> durante</label>
                    <MinutesAmountInput id="minutesAmount" type="number" placeholder="00" step={5} max={60} min={5} />
                    <span>minutos.</span>
                </FormContainer>


                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountButton type="submit">
                    <Play size={24} />
                    Começar
                </StartCountButton>
            </form>
        </HomeContainer>

    )
}