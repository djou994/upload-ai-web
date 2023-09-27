import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useEffect, useState} from "react";
import {api} from "@/lib/axios.ts";

interface prompt {
    id: string
    title: string
    template: string
}

interface PromptSelectProps {
    onPromptSelected: (template: string) => void
}

export function PromptSelect(props: PromptSelectProps) {
    const [ prompts, setPrompts ] = useState<prompt[] | null>(null)

    useEffect(() => {
        api.get('/prompts').then(response => {
            setPrompts(response.data)
        })
    }, [])

    function handlePromptSelected(promptId: string){
        const selectedPrompt = prompts?.find(prompt => prompt.id === promptId)

        if (!selectedPrompt) {
            return
        }

        props.onPromptSelected(selectedPrompt.template)
    }

    return (
        <Select onValueChange={handlePromptSelected}>
            <SelectTrigger>
                <SelectValue placeholder="Selectione um prompt..."/>
            </SelectTrigger>
            <SelectContent>
                {prompts?.map(prompt => {
                    return (
                        <SelectItem key={prompt.id} value={prompt.id}>
                            {prompt.title}
                        </SelectItem>
                    )
                })}
            </SelectContent>
        </Select>
    )
}