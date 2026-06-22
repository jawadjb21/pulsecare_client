import React, { useEffect, useState } from 'react';
import FormErrors from './FormErrors';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Controller } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import districts from "@/data/districts.json";
import upazilas from "@/data/updazila.json";


const LocationField = ({ control, errors, field }) => {
    const [districtId, setDistrictId] = useState(null);

    const upazilasAvailable = upazilas[2]?.data?.filter(upazila => upazila.district_id === districtId) || [];

    return (
        <div className="space-y-2 col-span-2 grid grid-cols-2 md:flex-col gap-x-2">
            {/* District */}
            <div className="col-span-1">
                <Label>District</Label>
                <Controller
                    name="district"
                    control={control}
                    rules={{
                        required: "Please choose your district.",
                    }}
                    render={({ field: { onChange, value } }) => (
                        <Select
                            value={value}
                            onValueChange={(selectedDistrictName) => {
                                onChange(selectedDistrictName);

                                const selectedDistrict = districts[2]?.data?.find(
                                    (d) => d.name === selectedDistrictName,
                                );

                                if (selectedDistrict) {
                                    setDistrictId(selectedDistrict.id);
                                }
                            }}
                        >
                            <SelectTrigger className="h-14 w-full rounded-2xl border-border/60 bg-background/50 px-5 shadow-sm">
                                <SelectValue placeholder="Select your district." />
                            </SelectTrigger>

                            <SelectContent className="rounded-2xl">
                                <SelectGroup>
                                    <SelectLabel>Blood Group</SelectLabel>
                                    {districts[2]?.data?.map((district) => (
                                        <SelectItem
                                            key={district.id}
                                            value={district.name}
                                        >
                                            {district.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                />
                <FormErrors errors={errors} field={field[0]}></FormErrors>
            </div>

            {/* Upazila */}
            <div className="col-span-1">
                <Label>Upazila</Label>
                <Controller
                    name="upazila"
                    control={control}
                    rules={{
                        required: "Please choose your upazila.",
                    }}
                    render={({ field: { onChange, value } }) => (
                        <Select value={value} onValueChange={onChange}>
                            <SelectTrigger className="h-14 w-full rounded-2xl border-border/60 bg-background/50 px-5 shadow-sm">
                                <SelectValue placeholder="Select your upazila." />
                            </SelectTrigger>

                            <SelectContent className="rounded-2xl">
                                <SelectGroup>
                                    <SelectLabel>Upazilas</SelectLabel>

                                    {upazilasAvailable.map((upazila) => (
                                        <SelectItem
                                            key={upazila.id}
                                            value={upazila.name}
                                        >
                                            {upazila.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                />
                <FormErrors errors={errors} field={field[1]}></FormErrors>
            </div>
        </div>
    );
};

export default LocationField;