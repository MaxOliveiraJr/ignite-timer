import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from "zod";

import {
    CountdownContainer,
    FormContainer,
    HomeContainer,
    MinutesAmountInput,
    Separator,
    StartCountButton,
    TaskInput,
} from "./styles";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1),
    minutesAmount: zod.number().min(5, "O tempo mínimo é de 5 minutos.").max(60, "O tempo máximo é de 60 minutos."),
});

// interface newCycleFormData {
//     task: string;
//     minutesAmount: number;
// }

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {

    const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 25
        }
    });

    const task = watch('task')
    const isSubmitDisabled = !task

    function handleCreateNewCycle(data: newCycleFormData) {
        console.log(data);
        reset()
    }


    return (
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormContainer>
                    <label htmlFor="task">Vou tralalhar em</label>
                    <TaskInput
                        id="task"
                        list="task-suggestions"
                        placeholder="Dê um nome para o seu projeto"
                        {...register('task')}
                    />

                    <datalist id="task-suggestions">
                        <option value="Projeto 1"></option>
                        <option value="Projeto 2"></option>
                        <option value="Projeto 3"></option>
                    </datalist>
                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput
                        id="minutesAmount"
                        type="number"
                        placeholder="00"
                        step={5}

                        {...register('minutesAmount', { valueAsNumber: true })}
                    />
                    <span>minutos.</span>
                </FormContainer>

                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountButton type="submit" disabled={isSubmitDisabled}>
                    <Play size={24} />
                    Começar
                </StartCountButton>
            </form>
        </HomeContainer>
    );
}
