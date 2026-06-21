import React from 'react';
import FormErrors from './FormErrors';
import { Controller } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import bloodGroups from "@/data/bloodGroups.json";

const BloodGroupField = ({ control, errors, field }) => {
    return (
        <div className="space-y-2 col-span-2">
            <Label>Blood Group</Label>
            <Controller
                name="blood"
                control={control}
                rules={{
                    required: "Please choose a blood group.",
                }}
                render={({ field: { onChange, value } }) => (
                    <Select value={value} onValueChange={onChange}>
                        <SelectTrigger className="h-14 w-full rounded-2xl border-border/60 bg-background/50 px-5 shadow-sm">
                            <SelectValue placeholder="Select your blood group" />
                        </SelectTrigger>

                        <SelectContent className="rounded-2xl">
                            <SelectGroup>
                                <SelectLabel>Blood Group</SelectLabel>

                                {bloodGroups.map((bloodGroup, idx) => (
                                    <SelectItem key={idx} value={bloodGroup.value}>
                                        {bloodGroup.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}
            />
            <FormErrors errors={errors} field={field[0]}></FormErrors>
        </div>
    );
};

export default BloodGroupField;