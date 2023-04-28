import BazaarTextField from "components/BazaarTextField";
import usePostFetch from "components/fetch/usePostFetch";
import { useFormik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
  mobile: yup
    .number()
    .min(9, "Phone Number is Too short")
    .required("Phone Number is required"),
  code: yup
    .number()
    .min(6, "Incorrect Code Format")
    .required("Code is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please re-type password"),
});

const AssignNewPassword = ({ input }) => {
  const { errors, touched, values, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        mobile: input,
        code: "",
        password: "",
        re_password: "",
      },
      validationSchema: schema,

      onSubmit: async ({ mobile, code, password }) => {
        const { data, response } = await usePostFetch(
          "https://sinbad-store.com/api/v2/reset-password",
          {
            "X-localization": "ar",
            "Content-Type": "application/json",
          },
          JSON.stringify({ code: code, password: password })
        );
        console.log(data, response)
    },
});

  return (
    <form onSubmit={handleSubmit} method="POST">
      <BazaarTextField
        mb={1.5}
        fullWidth
        name="mobile"
        size="small"
        type="mobile"
        variant="outlined"
        onBlur={handleBlur}
        value={values.mobile}
        label="Phone Number"
        placeholder="0999999999"
        error={!!touched.mobile && !!errors.mobile}
        helperText={touched.mobile && errors.mobile}
      />

      <BazaarTextField
        mb={1.5}
        fullWidth
        name="code"
        size="small"
        type="code"
        variant="outlined"
        onBlur={handleBlur}
        value={values.code}
        onChange={handleChange}
        label="Code"
        placeholder="123456"
        error={!!touched.code && !!errors.code}
        helperText={touched.code && errors.code}
      />

      <BazaarTextField
        mb={1.5}
        fullWidth
        size="small"
        name="password"
        label="Password"
        variant="outlined"
        autoComplete="on"
        placeholder="*********"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.password}
        error={!!touched.password && !!errors.password}
        helperText={touched.password && errors.password}
      />

      <BazaarTextField
        fullWidth
        size="small"
        autoComplete="on"
        name="re_password"
        variant="outlined"
        label="Retype Password"
        placeholder="*********"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.re_password}
        error={!!touched.re_password && !!errors.re_password}
        helperText={touched.re_password && errors.re_password}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default AssignNewPassword;
