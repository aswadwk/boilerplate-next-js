import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type SelectModelProps = {
    onChange: (value: string) => void;
    value?: string;
};

const SelectModel = ({
    onChange,
    value = "gpt-3.5-turbo",
}: SelectModelProps) => {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger
                id="model"
                className="items-start [&_[data-description]]:hidden"
            >
                <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="gpt-3.5-turbo">GPT 3.5 Turbo</SelectItem>
                <SelectItem value="gpt-4o-mini">GPT 4o Mini</SelectItem>
                <SelectItem value="gpt-4o">GPT 4o</SelectItem>
            </SelectContent>
        </Select>
    );
};

export default SelectModel;
