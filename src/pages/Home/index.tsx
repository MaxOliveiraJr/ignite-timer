import { HandPalm, Play } from "phosphor-react";

import {
    HomeContainer,
    StartCountdownButton,
    StopCountdownButton,
} from "./styles";
import { CountDown } from "./Components/Countdown";
import { NewCycleForm } from "./Components/NewCycleForm";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { FormProvider, useForm } from "react-hook-form";
import { CyclesContext } from "../../Contexts/CyclesContexts";
import { useContext } from "react";



const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1),
    minutesAmount: zod
        .number()
        .min(5, "O tempo mínimo é de 5 minutos.")
        .max(60, "O tempo máximo é de 60 minutos."),
});

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

// interface newCycleFormData {
//     task: string;
//     minutesAmount: number;
// }


export function Home() {

    const { createNewCycle, interruptCurrentCycle, activeCycle } = useContext(CyclesContext);


    const newCycleForm = useForm<newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount: 25,
        },
    });

    const { handleSubmit, watch, reset } = newCycleForm;

    function handleCreateNewCycle(data: newCycleFormData) {
        createNewCycle(data);
        reset();
    }


    const task = watch("task");
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>

                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <CountDown />

                {activeCycle ? (
                    <StopCountdownButton onClick={interruptCurrentCycle} type="button">
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>
                )}
            </form>
        </HomeContainer>
    );
}
