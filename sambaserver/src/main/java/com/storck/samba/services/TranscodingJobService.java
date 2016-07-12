package com.storck.samba.services;

import java.util.Date;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.storck.samba.dto.TranscodingJob;

@Path("/jobs")
public class TranscodingJobService {

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public Response create() {
		TranscodingJob job = new TranscodingJob();
		job.setId(1);
		job.setCreatedAt(new Date());
		return Response.ok(job, MediaType.APPLICATION_JSON_TYPE).build();
	}

	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String sayPlainTextHello() {
		return "Hello Jersey";
	}

}
