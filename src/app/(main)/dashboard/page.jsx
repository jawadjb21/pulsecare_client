import DashboardOverview from "@/components/dashboard/Dashboard";

const requests = [
    {
        _id: "req_1",
        recipientName: "Akbor Hossain",
        bloodGroup: "AB+",
        district: "Noakhali",
        upazila: "Companiganj",
        neededBy: "2026-07-02",
        status: "pending",
        hospital: "Noakhali General Hospital",
        contactNumber: "01712345678",
        createdAt: "2026-06-25T10:30:00Z",
    },
    {
        _id: "req_2",
        recipientName: "Rahim Uddin",
        bloodGroup: "O-",
        district: "Dhaka",
        upazila: "Dhanmondi",
        neededBy: "2026-07-05",
        status: "inprogress",
        hospital: "Square Hospital",
        contactNumber: "01898765432",
        createdAt: "2026-06-24T08:15:00Z",
    },
    {
        _id: "req_3",
        recipientName: "Karim Ahmed",
        bloodGroup: "A+",
        district: "Chattogram",
        upazila: "Pahartali",
        neededBy: "2026-07-01",
        status: "done",
        hospital: "Chattogram Medical College Hospital",
        contactNumber: "01911223344",
        createdAt: "2026-06-23T14:45:00Z",
    },
    {
        _id: "req_4",
        recipientName: "Nusrat Jahan",
        bloodGroup: "B-",
        district: "Sylhet",
        upazila: "Beanibazar",
        neededBy: "2026-07-08",
        status: "pending",
        hospital: "Sylhet MAG Osmani Medical College",
        contactNumber: "01622334455",
        createdAt: "2026-06-22T11:20:00Z",
    },
    {
        _id: "req_5",
        recipientName: "Tanvir Hasan",
        bloodGroup: "O+",
        district: "Khulna",
        upazila: "Sonadanga",
        neededBy: "2026-07-04",
        status: "inprogress",
        hospital: "Khulna Medical College Hospital",
        contactNumber: "01533445566",
        createdAt: "2026-06-21T09:10:00Z",
    },
];

export default function DashboardPage() {
    return (
        <DashboardOverview
            requests={requests}
            totalRequests={requests.length}
            totalPages={Math.ceil(requests.length / 3)}
            currentPage={1}
        />
    );
}