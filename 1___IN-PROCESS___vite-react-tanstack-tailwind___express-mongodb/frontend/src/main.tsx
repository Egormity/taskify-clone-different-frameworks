import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Bounce, ToastContainer } from "react-toastify";

import ProviderMuiTheme from "@app/providers/ProviderMuiTheme";
import ProviderQueryClient from "@app/providers/ProviderQueryClient";
import ProviderRouter from "@app/providers/ProviderRouter";

import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ProviderQueryClient>
			<ProviderMuiTheme>
				<ProviderRouter />
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick={false}
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
					transition={Bounce}
				/>
			</ProviderMuiTheme>
		</ProviderQueryClient>
	</StrictMode>,
);
