import { Routes, Route } from "react-router-dom";

import Mainlayout from "../layouts/Mainlayout";

import Home from "../pages/Home";
import PermissionForm from "../pages/PermissionForm";
import CertificateForm from "../pages/CertificateForm";
import PageExpired from "../pages/PageExpired";

export default function Mainrouter() {
  return (
    <Routes>
      <Route path="/*" element={<Mainlayout />}>
        <Route index element={<Home />} />
        <Route path="permission" element={<PermissionForm />} />
        <Route path="certificate" element={<CertificateForm />} />
        <Route path="*" element={<PageExpired />} />
      </Route>
    </Routes>
  );
}
